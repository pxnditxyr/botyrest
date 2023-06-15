import { ValidationError } from 'class-validator'

export const convertClassValidatorErrors = ( errors : ValidationError[] ) => {
  const constraints = errors.map( error => error.constraints )
  const constraintsMessages = constraints.flatMap(
    ( constraint ) => {
      if ( constraint )
        return Object.values( constraint )
      return []
    }
  )
  return constraintsMessages
}
  
  
