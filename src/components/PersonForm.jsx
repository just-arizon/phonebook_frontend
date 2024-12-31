import React from 'react'

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <div>
         <form>
        <div>
          <h2>add a new</h2>
          name:{' '}
          <input onChange={handleNameChange} value={newName} required />
        </div>
        <div>
          number:{' '}
          <input onChange={handleNumberChange} value={newNumber} required />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm