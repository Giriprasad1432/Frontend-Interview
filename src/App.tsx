import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import Create from './Create';
import Blogview from "./blogview"
import BlogDetail from './BlogDetail.tsx';
import { createContext } from 'react';
import AllPosts from './AllPosts.tsx';

function App() {
  const [count, setCount] = useState(0);
  const [show,setShow]=useState(false);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/all-posts' element={<AllPosts/>}/>
        <Route path='/blog/:id' element={<BlogDetail/>}/>  
        {/* <Route path='/blogview' element={<Blogview show={show} setShow={setShow}/>}/> */}
      </Routes>
    </QueryClientProvider>
  )
}

export default App
