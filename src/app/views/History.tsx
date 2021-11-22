import NoHistory from '../components/NoHistory';
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import SearchIcon from '@mui/icons-material/Search'
import * as React from 'react';

export default function History(props) {
  return props.history.length
    ? (
        <List>
          { props.history.map((item) => (
            <ListItemButton onClick={() => props.startSearch(item)} sx={{ py: 0, minHeight: 32 }}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={item} secondary={'6 minutes ago.'} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
            </ListItemButton>
          )}
        </List>
    ) : <NoHistory startSearch={() => props.startSearch('')}/>
}
