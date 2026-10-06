import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import TripResults from './pages/TripResults'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<TripPlanner />} />
        <Route path="/trip/:threadId" element={<TripResults />} />
      </Routes>
    </Router>
  );
}

export default App

