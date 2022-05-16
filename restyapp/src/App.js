import './App.css';
import Header from "./componants/header/Header";
import { useState,useEffect } from "react";
import Form from "./componants/form/form";
import Results from "./componants/result/result";
import Footer from "./componants/footer/footer";

function App() {
  const [data, setData] = useState({});
  const [method, setMethod] = useState("Get");
  const [url, setUrl] = useState();
  const [headers, setHeaders] = useState({});//////////////////
  const [body, setBody] = useState();
  const [loading, setLoading] = useState(false);
  function urlHandel(e) {
    e.preventDefault();
    setUrl(e.target.value);
    
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
    } else if (method === "Post") {
      const response = await fetch(url, {
        url: url,///////
        method: "Post",
        headers: {
          'Accept': 'application/json',//////////////////
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          JSON.parse(body)
          ),
      });
      let header= await response.headers.get("Content-Type");/////////////
      setHeaders({header});/////////////
      const data = await response.json();
      setData(data);
    } else if (method === "Put") {
      const response = await fetch(url, {
        url: url,
        method: "Put",
        headers: {
          'Accept': 'application/json',

          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          JSON.parse(body)
        ),
      });
      const data = await response.json();
      setData(data);
      // console.log(data);
      // console.log(body);
    } else if (method === "Delete") {
      const response = await fetch(url, {
        url: url,

        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setData(data);
    }
  }
  const removeData = new Promise((resolve)=>{setTimeout(resolve,15000)})
   
  useEffect(() => {
    removeData.then(()=>{
      setData({});
      setHeaders({});
      setBody({});
      setLoading(false);
    }
    )
  },);

  return (
    <div id="app">
      <Header />
      <div className='main'>
      <Form
        changeMethod={changeMethod}
        handleBody={handleBody}
        urlHandel={urlHandel}
        onSubmit={onSubmit}
        setData={setData}
      />
      {loading ? <Results data={data} method={method} url={url} headers={headers} /> : null}
      </div>
      <Footer />
    </div>
  );
}
export default App;