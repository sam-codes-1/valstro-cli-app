import events from 'events'
import readline from 'readline'
import {INPUT_STREAM_READER_EVENTS} from '../utils/eventNames'

export declare interface InputStreamReader {
  on(event: 'line', listener: () => void): this
  on(event: string, listener: Function): this
}

export class InputStreamReader extends events.EventEmitter {
  readlineInterface: readline.Interface
  stdout: NodeJS.WriteStream & {fd: 1}
  stdin: NodeJS.ReadStream & {fd: 0}
  stderr: NodeJS.WriteStream & {fd: 2}

  constructor() {
    super()

    this.stdin = process.stdin
    this.stdout = process.stdout
    this.stderr = process.stderr

    this.readlineInterface = readline.createInterface(this.stdin, this.stdout)

    this.readlineInterface
      .on(INPUT_STREAM_READER_EVENTS.LINE, data => {
        this.emit(INPUT_STREAM_READER_EVENTS.LINE, data)
      })
      .on(INPUT_STREAM_READER_EVENTS.CLOSE, () => {
        this.emit(INPUT_STREAM_READER_EVENTS.CLOSE)
      })
  }
  prompt() {
    this.readlineInterface.prompt(true)
  }

  print(msg: string) {
    this.stdout.write(`${msg}\n`)
  }
}
