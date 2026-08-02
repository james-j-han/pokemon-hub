import { Link } from 'react-router'

function Header({ search, setSearch, theme, setTheme }) {
  return (
    <header className='header'>
      <Link to="/"><h1>Everything Pokemon</h1></Link>
      <input
        type="text"
        placeholder="Search posts by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='header-actions'>
        <label className='theme-label'>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="meadow">Meadow</option>
            <option value="blush">Blush</option>
            <option value="sky">Sky</option>
            <option value="twilight">Twilight</option>
            <option value="slate">Slate</option>
            <option value="peach">Peach</option>
          </select>
        </label>
        <Link to="/create">
          <button>Create New Post</button>
        </Link>
      </div>
    </header>
  )
}

export default Header