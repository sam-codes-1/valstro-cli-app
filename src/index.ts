import {showWelcomeMessage} from './utils/logger'
import {CLI} from './cli'
;(async () => {
  showWelcomeMessage()
  await CLI()
})().catch(error => {
  console.log(error)
})
