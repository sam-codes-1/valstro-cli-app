import chalk from 'chalk'
import {Messages} from './messages'
import {SearchResponseType} from './types'
import {APPLICATION_NAME} from './searchQuery'
import {COMMANDS} from '../commands/all.commands'
import nodeEmoji from 'node-emoji'

export const showTitle = (): void => {
  console.log(`${chalk.bold.underline.blue(Messages.TITLE)}\n`)
}

export const showConnectionSuccessful = (): void => {
  console.log(`${chalk.bold.underline.blue(Messages.CONNECTION_SUCCESSFUL)} \n`)
}

export const showConnectionMessage = (): void => {
  console.log(`${chalk.cyan(Messages.CONNECTION_INITIALIZING)} \n`)
}

export const showWelcomeMessage = (): void => {
  console.log(
    `${chalk.yellow.underline(Messages.TITLE)}\n${chalk.blue(Messages.INTRODUCTION)} ${nodeEmoji.get('rocket')} \n`,
  )
}

export const showServerErrorMessage = (additionalError: Error): void => {
  console.log(`${chalk.red(Messages.SERVER_CONNECTION_ERROR)}. ${additionalError} \n`)
}

export const checkSearchComplete = (searchResult: SearchResponseType): boolean => {
  if (searchResult.resultCount === -1) {
    return true
  }

  if (searchResult.page === searchResult.resultCount) {
    return true
  }

  return false
}
export const showSearchResult = (result: SearchResponseType): void => {
  if (result.name) {
    console.log(`(${result.page}/${result.resultCount}) ${result.name} - [${result.films}]\n`)
  } else if (result.error) {
    console.log(`Error fetching movies: ${result.error}\n`)
  } else {
    console.log(`${JSON.stringify(result)}------------------------------\n`)
  }
}

export const showHelpMessage = (): void => {
  console.log(
    `
    ${APPLICATION_NAME} is a CLI application used to search using the Star Wars API, a public REST API.\n\n

    usage:
    ${COMMANDS.HELP} or ${COMMANDS.HELP_KEY_BINDINGS}: Show help message \n
    ${COMMANDS.EXIT} or ${COMMANDS.EXIT_KEY_BINDINGS}: Exit the application \n
    ${COMMANDS.ABOUT} or ${COMMANDS.ABOUT_KEY_BINDINGS}: About the application \n
    \n
  `,
  )
}

export const showAboutMessage = (): void => {
  console.log(`
    Type your search query anytime in this console and you'll ge the response back.\n
    The response wll be sent back to you as a stream from the web socket server.\n
    You have to wait for the response to finish loading before you can continue.\n
    To exit while the response is loading, press Ctrl + C, this will exit the application completely. \n
    When the responses are done loading, you can start a new search by typing your search query. \n
    To exit thus application at any time, type either 'exit', 'e', or press Ctrl + C. 
  `)
}

export const showExitMessage = (): void => {
  console.log(`Thank you for using valstro CLI app. ${nodeEmoji.get('wave')}`)
}

export const showInitServerConn = (): void => {
  console.log(`Initiating server connection. Please wait...`)
}

export const showServerConnected = (): void => {
  console.log(`
  Connected to server ${nodeEmoji.get('white_check_mark')}
  Type ${COMMANDS.HELP} or ${COMMANDS.HELP_KEY_BINDINGS} for help \n
  ${getPromptQuestion()} `)
}

export const showInvalidSearchQueryMsg = (): void => {
  console.log(`Invalid search query. If you need help, type ${COMMANDS.HELP} or ${COMMANDS.HELP_KEY_BINDINGS}`)
}

export const getPromptQuestion = (): string => {
  return 'What would you like to search for?'
}
