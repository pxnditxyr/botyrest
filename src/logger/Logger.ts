export class Logger {
  constructor (
    private readonly location : string,
  ) {}

  log ( message : string ) {
    console.log( `\x1b[32m[${ this.location }] ${ message } \x1b[0m` )
  }

  error ( message : string ) {
    console.log( `\x1b[31m[${ this.location }] ${ message } \x1b[0m` )
  }

  warn ( message : string ) {
    console.log( `\x1b[33m[${ this.location }] ${ message } \x1b[0m` )
  }
}
