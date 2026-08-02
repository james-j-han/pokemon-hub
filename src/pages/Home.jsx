import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'

function Home({ search }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderBy, setOrderBy] = useState('created_at')
  const [flagFilter, setFlagFilter] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)

      let query = supabase.from('posts').select()

      if (search.trim()) {
        query = query.ilike('title', `%${search}%`)
      }

      if (flagFilter) {
        query = query.eq('flag', flagFilter)
      }

      const { data, error } = await query.order(orderBy, { ascending: false })

      if (error) console.error(error)
      else setPosts(data)

      setLoading(false)
    }

    fetchPosts()
  }, [orderBy, search, flagFilter])

  if (loading) return <Spinner />

  return (
    <div>
      <div className="feed-controls">
        <button onClick={() => setOrderBy('created_at')}>Newest</button>
        <button onClick={() => setOrderBy('upvotes')}>Most Popular</button>
        <select value={flagFilter} onChange={(e) => setFlagFilter(e.target.value)}>
          <option value="">All Posts</option>
          <option value="Question">Questions</option>
          <option value="Opinion">Opinions</option>
          <option value="Guide">Guide</option>
          <option value="News">News</option>
          <option value="Meme">Meme</option>
        </select>
      </div>

      <div className="feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home