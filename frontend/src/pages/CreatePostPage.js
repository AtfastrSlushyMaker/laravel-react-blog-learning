import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import '../styles/components/PostForm.css';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        status: 'draft',
        user_id: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await postsAPI.createPost(formData);
            // Navigate back to blog page after successful creation
            navigate('/blog');
        } catch (err) {
            setError('Failed to create post');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-page">
            <div className="container">
                <h1>Create New Post</h1>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your post content..."
                            rows="10"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            {loading ? 'Creating...' : 'Create Post'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/blog')}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
