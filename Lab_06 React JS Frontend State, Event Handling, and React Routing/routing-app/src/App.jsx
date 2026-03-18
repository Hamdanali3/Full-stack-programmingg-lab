import { Link, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import './App.css'

function App() {
  return (
    <div className="routing-app">
      <header className="topbar">
        <h1>Lab Task 4: Multi-Page Website</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/products">Products</Link>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
