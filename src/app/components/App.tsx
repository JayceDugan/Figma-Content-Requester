import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

declare function require(path: string): any;

const App = ({}) => {
  const textbox = React.useRef<HTMLInputElement>(undefined);
  const [content, setContent] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const countRef = React.useCallback((element: HTMLInputElement) => {
    textbox.current = element;
  }, []);

  const onCreate = () => {
    loadContent(textbox.current.value)
  };

  const checkAssignContent = (content) => {
    parent.postMessage({pluginMessage: {type: 'assign-content', content}}, '*');
  }

  const loadContent = (url) => {
    setLoading(true)
    const request = new XMLHttpRequest();

    request.open('GET', 'https://cors.bridged.cc/'.concat(url));
    request.responseType = 'text';
    request.onload = () => {
      if (request.status === 200) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(request.response, 'text/html');
        const headingsNodeList = parsed.documentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const contentNodeList = parsed.documentElement.querySelectorAll('p');
        const nodeList = [...headingsNodeList, ...contentNodeList];
        const textContent = Array.prototype.map.call(nodeList, (item) => item.textContent);

        setContent(textContent)
      }

      setLoading(false)
    };

    request.send();
  }

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const {type, message} = event.data.pluginMessage;

      console.log(type, message)
    };
  }, []);

  return (
      <div className="pr-xsmall pl-xsmall">
        <div className='flex row align-items-end'>
          <div className='input flex-grow mr-xsmall'>
            <label className="label">URL</label>
            <input
              ref={countRef}
              placeholder="https://wwww.example.com"
              className='input__field'
            />
          </div>
          <button
              id='create'
              className="button button--primary"
              onClick={onCreate}
              disabled={loading}
          >
            { loading ? 'Loading...' : 'Request' }
          </button>
        </div>
        <div className="content">
          <ul style={{ padding: 0 }}>
            { content.map(content => ( <li key={content} className='type text-left mb-xxxsmall' onClick={() => checkAssignContent(content)}>{content}</li> ))}
          </ul>
        </div>
      </div>
  );
};

export default App;
