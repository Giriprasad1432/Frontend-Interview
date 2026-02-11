import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import Create from './Create';
import Blogview from "./blogview"
import { createContext } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [show,setShow]=useState(false);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
       { <Route path='/blogview' element={<Blogview show={show} setShow={setShow}/>}/>}
      </Routes>
    </QueryClientProvider>
  )
}

export default App
