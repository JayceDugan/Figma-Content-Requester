import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import * as React from 'react';

export default function searchError(props) {
  return (
    <>
      <Typography variant="body1" sx={{ color: 'grey.500', marginBottom: 1 }}>An error ocurred, please try again.</Typography>
      <Button variant="contained" color="primary" size="small" sx={{ textTransform: 'none' }} startIcon={<ReplayIcon />} onClick={props.retry}>
        Retry
      </Button>
    </>
  )
}
