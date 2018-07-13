import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar'

const styles = theme => ({
  searchBar: {
    textAlign: 'center'
  },
});

function Search(props) {
  const { classes, onSearch, disabled } = props;
  return (
    <section className={classes.searchBar}>
      <SearchBar
        placeholder="Search Gamertag"
        onRequestSearch={(value) => onSearch(value)}
        style={{
          margin: '0 auto',
          maxWidth: 800
        }}
        disabled={disabled}
      />
    </section>
  );
}


export default withStyles(styles)(Search);