import { Link } from 'react-router'

function Header() {
  return (
    <header>
      <Link to="/"><h1>Who's Your Favorite Pokemon?</h1></Link>
      <input type="text" placeholder="Search posts by title..." />
      <Link to="/create">
        <button>Create New Post</button>
      </Link>
    </header>
  )
}

export default Header