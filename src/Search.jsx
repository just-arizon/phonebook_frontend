import React from 'react'

const Search = ({handleSearchChange, searchQuery}) => {
  return (
    <div>
        Search: <input type="text" onChange={handleSearchChange} value={searchQuery}/>
    </div>
  )
}

export default Search