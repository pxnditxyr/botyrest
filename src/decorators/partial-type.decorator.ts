import { IsOptional } from 'class-validator';

export const PartialType = ( classDto : any ) => {
  const updatedClass = class extends classDto {
    constructor () {
      super()
      Object.keys( this ).forEach( ( key ) => {
        const descriptor = Object.getOwnPropertyDescriptor( this, key )
        if ( descriptor ) {
          const isOptional = Reflect.getMetadata( 'class-validator:isOptional', this, key )
          if ( !isOptional ) {
            Object.defineProperty( this, key, {
              ...descriptor,
              enumerable: true,
              configurable: true,
              writable: true,
              value: IsOptional()( this, key )
            })
          }
        
        }
      })
    }
  }
  return updatedClass
}
