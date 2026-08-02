import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'

function App() {
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState('meadow')

  useEffect(() => {
    document.body.className = theme === 'meadow' ? '' : `theme-${theme}`
  }, [theme])

  return (
    <>
      <Header search={search} setSearch={setSearch} theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App