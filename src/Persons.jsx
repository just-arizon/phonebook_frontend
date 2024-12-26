import React from 'react'

const Persons = ({filteredPersons}) => {
  return (
    <div>
         {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
    </div>
  )
}

export default Persons