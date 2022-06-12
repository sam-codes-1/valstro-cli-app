import {io} from 'socket.io-client'
import {SearchResponseType} from './utils/types'
import {WEB_SOCKET_CLIENT_EVENT_NAMES, INPUT_STREAM_READER_EVENTS} from './utils/eventNames'
import {COMMANDS} from './commands/all.commands'
import {displaySearchResult, showAboutMessage, showHelpMessage, showServerErrorMessage} from './utils/logger'
import dotenv from 'dotenv'
import {InputStreamReader} from './prompts/InputStreamReader'
import {isSearchQueryValid} from './utils/searchQuery'
dotenv.config()

const webSocketServerUrl = process.env.WEB_SOCKET_SERVER_URL || 'http://0.0.0.0:3000'
const reconnectionDelayMax = 1000

export const CLI = async () => {
  try {
    const consoleListener = new InputStreamReader()
    const socket = io(webSocketServerUrl, {
      reconnectionDelayMax: reconnectionDelayMax,
    })
    socket.on(WEB_SOCKET_CLIENT_EVENT_NAMES.CONNECT, () => {
      consoleListener.on(INPUT_STREAM_READER_EVENTS.LINE, (data: string | undefined) => {
        consoleListener.prompt()

        switch (data) {
          case COMMANDS.EXIT:
          case COMMANDS.EXIT_KEY_BINDINGS:
            consoleListener.print('bye')
            socket.close()
            process.exit(0)
          case COMMANDS.HELP:
          case COMMANDS.HELP_KEY_BINDINGS:
            showHelpMessage()
            break
          case COMMANDS.ABOUT:
          case COMMANDS.ABOUT_KEY_BINDINGS:
            showAboutMessage()
            break
          default:
            if (isSearchQueryValid(data)) {
              socket.emit(WEB_SOCKET_CLIENT_EVENT_NAMES.SEARCH, {query: data})

              socket.on(WEB_SOCKET_CLIENT_EVENT_NAMES.SEARCH, (searchResponse: SearchResponseType) => {
                displaySearchResult(data, searchResponse)
              })
            } else {
              consoleListener.print('Invalid search query')
            }
            consoleListener.prompt()
        }
      })
    })
    // eslint-disable-next-line no-warning-comments
    // TODO-THIS type error
  } catch (error) {
    showServerErrorMessage(error as Error)
  }
}
