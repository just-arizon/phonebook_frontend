import { useState, useEffect } from 'react';
import SearchComponent from './Search';
import PersonForm from './PersonForm';
import Persons from './Persons';
// import axios from 'axios'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Data fetching
useEffect(() => {
  personService
  .getAll()
  .then(initialPersons => {
    console.log(initialPersons);
    setPersons(initialPersons)
  })
}, [])
  // Function to submit a name
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      return;
    }
 // conditional statement that will replace the number of an existing person in the phonebook   
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (result) {
        const changedPerson = { ...existingPerson, number: newNumber };
        personService
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          alert(`${newName}'s number was updated successfully.`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          if (!error.response) {
            alert('Network error: Unable to connect to the server.');
          } else if (error.response.status === 404) {
            alert('The record was already deleted or does not exist.');
          } else if (error.response.status === 400) {
            alert('Bad Request: The server could not understand the request.');
          } else if (error.response.status === 403) {
            alert('You do not have permission to update this record.');
          } else if (error.response.status === 500) {
            alert('Server error: Please try again later.');
          } else if (error.code === 'ECONNABORTED') {
            alert('Request timed out. Please try again.');
          } else {
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred. Please try again.');
          }
        });
        
      }
      return;
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

        // toggleDelete function
        const toggleDeleteOf = (id) => { 
          const person = persons.find(person => person.id === id)
          const result = window.confirm(`Delete ${person.name} ?`)

          if (result) {
            personService
            .deletePerson(id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id))
              alert(`${person.name} was deleted successfully.`); 
            })
            .catch(error => {
              if (!error.response) {
                alert('Network error: Unable to connect to the server.');
              } else if (error.response.status === 404) {
                alert('The record was already deleted or does not exist.');
              } else if (error.response.status === 400) {
                alert('Bad Request: The server could not understand the request.');
              } else if (error.response.status === 403) {
                alert('You do not have permission to delete this record.');
              } else if (error.response.status === 500) {
                alert('Server error: Please try again later.');
              } else if (error.code === 'ECONNABORTED') {
                alert('Request timed out. Please try again.');
              } else {
                console.error('An unexpected error occurred:', error);
                alert('An unexpected error occurred. Please try again.');
              }
            });
            
          }

        }
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
       <Persons filteredPersons={filteredPersons} toggleDelete={toggleDeleteOf}/>
      </ul>
    </div>
  );
}

export default App;
