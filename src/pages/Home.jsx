import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from '../components/PostCard'

function Home({ search }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [orderBy, setOrderBy] = useState('created_at')

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)

      let query = supabase.from('posts').select()

      if (search.trim()) {
        query = query.ilike('title', `%${search}%`)
      }

      const { data, error } = await query.order(orderBy, { ascending: false })

      if (error) console.error(error)
      else setPosts(data)

      setLoading(false)
    }

    fetchPosts()
  }, [orderBy, search])

  if (loading) return <p>Loading posts...</p>

  return (
    <div>
      <div className="feed-controls">
        <button onClick={() => setOrderBy('created_at')}>Newest</button>
        <button onClick={() => setOrderBy('upvotes')}>Most Popular</button>
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