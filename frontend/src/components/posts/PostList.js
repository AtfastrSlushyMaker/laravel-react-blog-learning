import React, { useState, useEffect } from 'react';
import { postsAPI } from '../../services/api';
const PostList = ({ onEditPost }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchPosts();
    }
        , []);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postsAPI.getAllPosts();
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await postsAPI.deletePost(postId);
                setPosts(posts.filter(post => post.id !== postId));
            } catch (err) {
                setError('Failed to delete post');
                console.error(err);
            }
        }
    };
    if (loading) return <div className="loading">Loading posts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="post-list">
            <h2>Blog Posts</h2>
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p className="post-meta">
                            By {post.user?.name || 'Unknown'} | Status: {post.status}
                        </p>
                        <p className="post-content">
                            {post.content.substring(0, 150)}...
                        </p>
                        <div className="post-actions">
                            <button onClick={() => onEditPost(post)} className="btn-edit">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="btn-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
