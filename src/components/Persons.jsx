import React from 'react'

const Persons = ({filteredPersons, toggleDelete}) => {
  return (
    <div>
         {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} {' '}
            <button onClick={() => toggleDelete(person.id)}>delete</button>
          </li>
        ))}
    </div>
  )
}

export default Persons