import React, { useState, useEffect } from 'react';
import { postsAPI } from '../../services/api';
import '../../styles/components/PostForm.css';
const PostForm = ({ editingPost, onPostSaved, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        status: 'draft',
        user_id: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingPost) {
            setFormData({
                title: editingPost.title || '',
                content: editingPost.content || '',
                status: editingPost.status || 'draft',
                user_id: editingPost.user?.id || 1,
            });
        }
    }, [editingPost]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (editingPost) {
                await postsAPI.updatePost(editingPost.id, formData);
            } else {
                await postsAPI.createPost(formData);
            }

            setFormData({ title: '', content: '', status: 'draft', user_id: 1 });
            onPostSaved();
        } catch (err) {
            setError('Failed to save post');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="post-form">
            <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
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
                        rows="6"
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
                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                    </button>
                    {editingPost && (
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};


export default PostForm;