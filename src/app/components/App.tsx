import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import HistoryView from '../views/History'
import SearchView from '../views/Search'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'

declare function require(path: string): any;

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" component={'span'}>{ children }</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const App = ({}) => {
  const [value, setValue] = React.useState(0)
  const [history, setHistory] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const theme = useTheme()

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const {type, message} = event.data.pluginMessage;

      console.log(type, message)
    };
  }, []);

  function handleChange(event, value) {
    setValue(value)
  }

  function addToHistory(url) {
    if (!history.includes(url)) setHistory([...history, url])
  }

  function startSearch(url) {
    setValue(0)
    setSearchValue(url)
  }

  return (
    <div>
      <Box sx={{ padding: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Search" { ...a11yProps(0) } />
          <Tab label="History" { ...a11yProps(1) } />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x' }
          index={value}
          onChangeIndex={handleChange}
        >
          <TabPanel value={value} index={0}>
            <SearchView searchValue={searchValue} addToHistory={addToHistory} history={history} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoryView history={history} startSearch={startSearch} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
};

export default App;
