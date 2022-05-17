import './App.css';
import Header from "./componants/header/Header";
import { useState, useEffect,useReducer} from "react";
import Form from "./componants/form/form";
import Results from "./componants/result/result";
import Footer from "./componants/footer/footer";
import historyReducer, { addAction } from './reducer';
const initialState = {
  history: [],
  count: 0,

}
function App() {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const [data, setData] = useState({});
  const [render, setRender] = useState(false);
  const [method, setMethod] = useState("Get");
  const [url, setUrl] = useState();
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState();
  const [loading, setLoading] = useState(false);
  function urlHandel(e) {
    e.preventDefault();
    setUrl(e.target.value);

  }
  function renderHistory(e) {
    e.preventDefault();
    render?setRender(false):setRender(true)
    
  }
  function handleBody(e) {
    e.preventDefault();
    setBody(e.target.value);

  }
  function changeMethod(e) {
    e.preventDefault();

    setMethod(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (method === "Get") {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      let history = {
        
        url: url,
        method: method,
        response: data,
      }
      dispatch(addAction(history));
    } 
    else if (method === "Post") {

    const response = await fetch(url, {
      

        method: "Post",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(body) 
      });
      let header = await response.headers.get("Content-Type");
      setHeaders({ header });
      const data = await response.json();
      setData(data);
      let history = {
        
        url: url,
        method: method,
        response: data,
      }
      dispatch(addAction(history));
    } else if (method === "Put") {
      const response = await fetch(url, {
        method: "Put",
        headers: {
          'Accept': 'application/json',

          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          body
        ),
      });
      const data = await response.json();
      setData(data);
      let history = {
        
        url: url,
        method: method,
        response: data,
      }
      dispatch(addAction(history));
     
    } else if (method === "Delete") {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setData(data);
      let history = {
        
        url: url,
        method: method,
        response: data,
      }
      dispatch(addAction(history));
    }
  }
  const removeData = new Promise((resolve) => { setTimeout(resolve, 15000) })

  useEffect(() => {
    removeData.then(() => {
      setData({});
      setHeaders({});
      setBody({});
      setLoading(false);
    }
    )
  });

  return (
    <div id="app">
      <Header renderHistory={renderHistory} />
      <div className='main'>
        <Form
          changeMethod={changeMethod}
          handleBody={handleBody}
          urlHandel={urlHandel}
          onSubmit={onSubmit}
          setData={setData}
        />
        {loading ? <Results data={data} method={method} url={url} headers={headers} /> : null}
        {render ? <Results data={state} method={method} url={url} /> : null}
      </div>
      <Footer />
    </div>
  );
}
export default App;