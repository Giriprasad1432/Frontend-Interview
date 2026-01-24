import { useState } from 'react'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Home/>
    </QueryClientProvider>
  )
}

export default App
