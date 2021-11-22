import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import * as React from 'react';

export default function ListContent(props) {
  const checkAssignContent = (content) => {
    parent.postMessage({pluginMessage: {type: 'assign-content', content}}, '*');
  }

  const [expanded, setExpanded] = React.useState('')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const keyDescriptions = {
    'headings': 'Content found in headings. (<h1> to <h6> tags).',
    'paragraphs': "Content found in paragraphs. (<p> tags.)",
    'links': 'Content found in links, (<a> tags.)'
  }

  return (
      <>
        { Object.entries(props.content).map(([key, val]) => (
            <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${key}-content`}
                id={`panel-${key}`}
              >
                <Typography sx={{ textTransform: 'capitalize', width: '35%', flexShrink: 0, textAlign: 'left' }}>{ key }</Typography>
                <Typography sx={{ color: 'text.secondary', textAlign: 'left' }} variant="body2">
                  { keyDescriptions[key] }
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ width: '100%', padding: 1 }}>
                  { val.map(item => (
                    <ListItem key={item} sx={{ px: 0 }}>
                      <ListItemButton role={undefined} onClick={() => checkAssignContent(item)}>
                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}/>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
        ))}
      </>
  )
}
