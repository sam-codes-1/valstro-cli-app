import {io} from 'socket.io-client'
import {SearchResponseType} from './utils/types'
import {WEB_SOCKET_CLIENT_EVENT_NAMES, INPUT_STREAM_READER_EVENTS} from './utils/eventNames'
import {COMMANDS} from './commands/all.commands'
import {
  showSearchResult,
  showAboutMessage,
  showHelpMessage,
  showServerErrorMessage,
  showExitMessage,
  showInitServerConn,
  showServerConnected,
  showInvalidSearchQueryMsg,
  getPromptQuestion,
  checkSearchComplete,
} from './utils/logger'
import dotenv from 'dotenv'
import {InputStreamReader} from './prompts/InputStreamReader'
import {isSearchQueryValid} from './utils/searchQuery'
dotenv.config()

const webSocketServerUrl = process.env.WEB_SOCKET_SERVER_URL || 'http://0.0.0.0:3000'
const reconnectionDelayMax = 1000

export const CLI = async () => {
  try {
    const consoleListener = new InputStreamReader()
    showInitServerConn()
    const socket = io(webSocketServerUrl, {
      reconnectionDelayMax: reconnectionDelayMax,
    })
    let searchData: string | undefined
    socket.on(WEB_SOCKET_CLIENT_EVENT_NAMES.CONNECT, () => {
      showServerConnected()
      consoleListener.prompt()
      consoleListener.on(INPUT_STREAM_READER_EVENTS.LINE, (data: string | undefined) => {
        searchData = data
        switch (searchData) {
          case COMMANDS.EXIT:
          case COMMANDS.EXIT_KEY_BINDINGS:
            showExitMessage()
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
            if (isSearchQueryValid(searchData)) {
              console.log(`searching for ${searchData}. Please wait....`)
              socket.emit(WEB_SOCKET_CLIENT_EVENT_NAMES.SEARCH, {query: searchData})
            } else {
              showInvalidSearchQueryMsg()
            }
        }
      })
    })

    socket.on(
      WEB_SOCKET_CLIENT_EVENT_NAMES.SEARCH,
      (
        searchResponse: SearchResponseType,
        callback = (showPrompt: boolean) => {
          if (showPrompt) {
            consoleListener.print(getPromptQuestion())
            consoleListener.prompt()
          }
        },
      ) => {
        showSearchResult(searchData, searchResponse)
        const isSearchComplete = checkSearchComplete(searchResponse)
        callback(isSearchComplete)
      },
    )
  } catch (error) {
    showServerErrorMessage(error as Error)
  }
}
