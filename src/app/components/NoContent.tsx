import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import * as React from 'react';

export default function NoContent(props) {
  return (
      <>
        <Typography variant="body1" sx={{ color: 'grey.500', marginBottom: 1 }}>
          {
            props.search && props.search.length
              ? `No content found for ${props.search}`
              : 'Enter a URL to find content.'
          }
        </Typography>
        { props.search && props.search.length && (
            <Button variant="contained" color="primary" size="small" sx={{ textTransform: 'none' }} startIcon={<ReplayIcon />} onClick={props.retry}>
              Retry
            </Button>
        )}
      </>
  )
}
