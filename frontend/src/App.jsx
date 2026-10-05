import { useState } from 'react'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'


function App() {
  const [count, setCount] = useState(0)

  return (
      <TripPlanner/>
    
  )
}

export default App
