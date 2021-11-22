import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchError from '../components/SearchError';
import ListContent from '../components/ListContent';
import * as React from 'react';
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function Search(props) {
  const [search, setSearch] = React.useState('')
  const [content, setContent] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  useEffect(() => {
    setSearch(props.searchValue)
    loadContent(props.searchValue)
  }, [props.searchValue])

  const loadContent = (url = '') => {
    if (!url || !url.length) return

    setFailed(false)
    setLoading(true)

    const request = new XMLHttpRequest();

    request.open('GET', 'https://secret-ocean-49799.herokuapp.com/'.concat(url));

    request.responseType = 'text';
    request.onload = () => {
      if (request.status === 200) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(request.response, 'text/html');
        const headingsNodeList = parsed.documentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const contentNodeList = parsed.documentElement.querySelectorAll('p');
        const linksNodeList = parsed.documentElement.querySelectorAll('a');
        const getContent = (item) => item.textContent

        const newContent = {
          headings: [...headingsNodeList].map((item) => item.textContent),
          paragraphs: [...contentNodeList].map(getContent),
          links: [...linksNodeList].map(getContent)
        }

        setContent(newContent)
        setSuccess(true)
      } else {
        setFailed(true)
      }

      props.addToHistory(url)
      setLoading(false)
    };

    request.onerror = () => {
      setFailed(true)
      setLoading(false)
    }

    request.send();
  }

  return (
      <Box>
        <Box sx={{display: 'flex', alignItems: 'center', padding: 0}}>
          <TextField
            label={loading ? `Loading...` : 'URL'}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            variant='filled'
            focused
            size='small'
            disabled={loading}
            color={failed ? 'error' : success ? 'success' : 'primary'}
            sx={{width: '100%'}}
            InputProps={{
              endAdornment: (loading) ? <CircularProgress color='inherit' size={25} />
                  : <InputAdornment position='end'>
                <IconButton
                  onClick={() => loadContent(search)}
                  color={failed ? 'error' : success ? 'success' : 'primary'}
                  disabled={loading || !search.length}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{marginTop: 2}}>
          {
            (() => {
              if (loading) return null;
              if (failed) return <SearchError retry={() => loadContent(search)} search={search} />;
              if (success) return <ListContent retry={() => loadContent(search)} content={content} />;
            })()
          }
        </Box>
      </Box>
  );
}

Search.propTypes = {
  history: PropTypes.array,
  addToHistory: PropTypes.func,
  searchValue: PropTypes.string
}

Search.defaultProps = {
  history: [],
  searchValue: ''
}
