import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import * as React from 'react';

export default function NoHistory(props) {
  return (
      <>
        <Typography variant="body1" sx={{ color: 'grey.500', marginBottom: 1 }}>
          No History of searches.
        </Typography>
        <Button variant="contained" color="primary" size="small" sx={{ textTransform: 'none' }} startIcon={<ReplayIcon />} onClick={props.startSearch}>
          Search
        </Button>
      </>
  )
}
