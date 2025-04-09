
import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ value, onChangeText, placeholder = 'Search events...' }) => {
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 16,
    borderRadius: 10,
  },
});

export default SearchBar;
