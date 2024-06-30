import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ width, onSearch, sWidth ,height}) {
  return (
    <Paper
      component='form'
          sx={{
          backgroundColor:"#b2d8d8",
        height:height|| '2.5rem',
        display: 'flex',
        alignItems: 'center',
        width: sWidth|| {},
        boxShadow: 'none',
        border: '1px solid #DFDFDF',
        borderRadius: '7px',
        '&:hover': {
          borderColor: 'primary.main',
        },
        '&:active': {
          borderColor: 'primary.main',
        },
        '&:focus': {
          borderColor: 'primary.main',
        },
      }}
    >
      <IconButton
        type='button'
        sx={{ p: '10px' }}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search'
        onChange={(e) => onSearch(e.target.value)}
      />
    </Paper>
  );
}