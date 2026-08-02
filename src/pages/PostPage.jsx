import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { supabase } from '../supabaseClient'
import { getUserId } from '../getUserId'

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const currentUserId = getUserId()

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else setPost(data)
      setLoading(false)
    }
    fetchPost()
  }, [id])

  async function handleDelete() {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      console.error(error)
      return
    }
    navigate('/')
  }

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select()
        .eq('post_id', id)
        .order('created_at', { ascending: true })

        if (error) console.error(error)
        else setComments(data)
    }
    fetchComments()
  }, [id])

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: id, content: newComment, user_id: getUserId() })
      .select()

    if (error) {
      console.error(error)
      return
    }

    setComments([...comments, data[0]])
    setNewComment('')
  }

  async function handleCommentDelete(commentId) {
    const { error } = await supabase.from('comments').delete().eq('id', commentId)

    if (error) {
      console.error(error)
      return
    }

    setComments(comments.filter((c) => c.id !== commentId))
  }

  if (loading) return <p>Loading post...</p>
  if (!post) return <p>Post not found.</p>

  const isOwner = post.user_id === currentUserId

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p className="post-page-meta">
        {new Date(post.created_at).toLocaleString()} · ▲ {post.upvotes}
      </p>
      {post.content && <p>{post.content}</p>}
      {post.image_url && <img src={post.image_url} alt={post.title} />}

      {isOwner && (
        <div className="post-page-actions">
          <Link to={`/posts/${id}/edit`}><button>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <div className="comments">
        <h3>Comments</h3>

        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>

        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <span className="comment-meta">
              {new Date(comment.created_at).toLocaleString()}
            </span>
            {comment.user_id === currentUserId && (
              <button onClick={() => handleCommentDelete(comment.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPage