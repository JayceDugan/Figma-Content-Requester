import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'
import * as React from 'React'

export default function LoadingContent() {
  return (
      <Box>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>Loading...</Typography>
        <LinearProgress color="primary" />
      </Box>
  )
}
