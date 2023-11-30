import React, { useState, useEffect } from 'react';
import { OneIconTextField } from '../oneIconTextField.js';
import SearchIcon from '@mui/icons-material/Search';
import SearchBarResults from './searchBarResults.js'; 
import { Container } from '@mui/material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetch(`http://localhost:3001/item/description?keyword=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setFilteredItems(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [searchTerm]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        borderColor: '#006d77',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '1rem',
        margin: '0 auto',
        padding: '2rem',
        background: '#edf6f9',
        boxShadow: '0px 0px 1px 1px #bdbdbd',
      }}
    >
      <OneIconTextField
        name="search"
        label="Search here..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        fieldColor="#1b4965"
        icon={<SearchIcon />}
      />
      <SearchBarResults filteredItems={filteredItems} />
    </Container>
  );
};

export default SearchBar;
