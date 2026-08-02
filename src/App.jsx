import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App