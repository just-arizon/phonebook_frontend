import React from 'react'

const Validator = ({message}) => {
    if (message === null ) {
        return null;
    }
  return (
    <div className='error'>{message}</div>
  )
}

export default Validator