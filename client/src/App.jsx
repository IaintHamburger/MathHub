import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Math from './pages/Math';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800">
          <ul className='flex justify-center items-center gap-4 py-4'>
            <li>
              <Link to="/" className="text-white hover:text-gray-300 transition-colors">首頁</Link>
            </li>
            <li>
              <Link to="/math" className="text-white hover:text-gray-300 transition-colors">數學天地</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-300 transition-colors">關於我們</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<Math />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
