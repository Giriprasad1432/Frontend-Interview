import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import Create from './Create';

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
