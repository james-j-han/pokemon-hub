import { Link } from 'react-router'

function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <h3>{post.title}</h3>
      <div className="post-card-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span>▲ {post.upvotes}</span>
      </div>
    </Link>
  )
}

export default PostCard