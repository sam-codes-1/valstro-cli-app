import chalk from 'chalk'
import {Messages} from './messages'
import {SearchResponseType} from './types'
import {APPLICATION_NAME} from './searchQuery'
import {COMMANDS} from '../commands/all.commands'
import nodeEmoji from 'node-emoji'

export const showTitle = () => {
  console.log(`${chalk.bold.underline.blue(Messages.TITLE)} ${nodeEmoji.get('smile')}\n`)
}

export const showConnectionSuccessful = () => {
  console.log(`${chalk.bold.underline.blue(Messages.CONNECTION_SUCCESSFUL)} \n`)
}

export const showConnectionMessage = () => {
  console.log(`${chalk.cyan(Messages.CONNECTION_INITIALIZING)} \n`)
}

export const showWelcomeMessage = () => {
  console.log(
  `${chalk.yellow.underline(Messages.TITLE)}
  ${chalk.blue(Messages.INTRODUCTION)} ${nodeEmoji.get('rocket')} \n`)
}

export const showServerErrorMessage = (additionalError: Error) => {
  console.log(`${chalk.red(Messages.SERVER_CONNECTION_ERROR)}. ${additionalError} \n`)
}

export const displaySearchResult = (searchQuery: string | undefined, result: SearchResponseType) => {
  if (result.name) {
    console.log(
      `\n
      ------------------------------\n
      Name: ${result.name}.\n
      Filmography: ${result.films}.\n
      Current Page: ${result.page}.\n
      Total result Count: ${result.resultCount}\n
      ------------------------------\n
      \n
    `,
    )
  } else if (result.error) {
    console.log(`
    ------------------------------\n
    Error fetching movies for ${searchQuery}. Error: ${result.error}
    ------------------------------
    `)
  } else {
    console.log(`
    ------------------------------\n 
    ${JSON.stringify(result)}\n
    ------------------------------
    `)
  }
}

export const showHelpMessage = () => {
  console.log(
    `
    ${APPLICATION_NAME} is a CLI application used to search for the Star Wars API, which is a public REST API.\n\n

    usage:
    ${COMMANDS.HELP} or ${COMMANDS.HELP_KEY_BINDINGS}: Show help message \n
    ${COMMANDS.EXIT} or ${COMMANDS.EXIT_KEY_BINDINGS}: Exit the application \n
    ${COMMANDS.ABOUT} or ${COMMANDS.ABOUT_KEY_BINDINGS}: About the application \n
    \n
  `,
  )
}

export const showAboutMessage = () => {
  console.log(`
    Type your search query anytime in this console and you'll ge the response back.\n
    The response wll be sent back to you as a stream from the web socket server.\n
    You have to wait for the response to finish loading before you can continue.\n
    To exit while the response is loading, press Ctrl + C, this will exit the application completely. \n
    When the responses are done loading, you can start a new search by typing your search query. \n
    To exit thus application at any time, type either 'exit', 'e', or press Ctrl + C. 
  `)
}
