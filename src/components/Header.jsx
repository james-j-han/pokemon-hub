import { Link } from 'react-router'

function Header({ search, setSearch, theme, setTheme }) {
  return (
    <header>
      <Link to="/"><h1>Everything Pokemon</h1></Link>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="meadow">Meadow</option>
        <option value="blush">Blush</option>
        <option value="sky">Sky</option>
      </select>
      <Link to="/create">
        <button>Create New Post</button>
      </Link>
    </header>
  )
}

export default Header