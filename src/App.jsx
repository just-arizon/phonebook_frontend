import { useState, useEffect } from 'react';
import SearchComponent from './Search';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios'


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Data fetching
useEffect(() => {
  axios
  .get('http://localhost:3002/persons')
  .then(response => {
    setPersons(response.data)
  })
})
  // Function to submit a name
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      return;
    }
    if (!newName.trim() || !newNumber.trim()) {
      alert('Both name and number are required.');
      return;
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPersonObject));
    setNewName('');
    setNewNumber('');
  };

  // Function to handle name input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Function to handle number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Search function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter persons based on the search query
  const filteredPersons =
    searchQuery.trim() === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchComponent
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
     
     <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} newName={newName}/>

      <h2>Numbers</h2>
      <ul>
       <Persons filteredPersons={filteredPersons}/>
      </ul>
    </div>
  );
}

export default App;
