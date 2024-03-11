import {useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import MarkDownFile from "./components/MarkDownFile";
import LoginForm from './components/loginForm';
function App() {

  
  const [selectedUrl, setSelectedUrl] = useState(null);

  function handleClickArticle(url) {
    setSelectedUrl(url);
   
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio handler={handleClickArticle}/>} />
        <Route path="get/:id" element={ <MarkDownFile  url={selectedUrl}/> } />
        <Route path="load" element={<LoginForm/>}/>
      </Routes>
    </>
  );
}

export default App;
