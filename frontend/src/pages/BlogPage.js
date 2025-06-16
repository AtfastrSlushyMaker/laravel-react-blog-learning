import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/posts/PostList';
import PostForm from '../components/posts/PostForm';
import '../styles/components/BlogPage.css';

const BlogPage = () => {
    const [currentView, setCurrentView] = useState('list');
    const [editingPost, setEditingPost] = useState(null);
    const [refreshPosts, setRefreshPosts] = useState(0);

    const handleEditPost = (post) => {
        setEditingPost(post);
        setCurrentView('form');
    };

    const handlePostSaved = () => {
        setCurrentView('list');
        setEditingPost(null);
        setRefreshPosts(prev => prev + 1);
    };

    const handleCancel = () => {
        setCurrentView('list');
        setEditingPost(null);
    };

    return (
        <div className="blog-page">
            <div className="container">
                {currentView === 'list' ? (
                    <>
                        {/* Blog Header */}
                        <div className="blog-header">
                            <h1>All Blog Posts</h1>
                            <p>Discover stories, thinking, and expertise from writers on any topic.</p>                            <Link to="/create" className="btn btn-primary">
                                <i className="fas fa-pen-nib"></i> Write a Post
                            </Link>
                        </div>

                        {/* Posts List */}
                        <PostList
                            key={refreshPosts}
                            onEditPost={handleEditPost}
                        />
                    </>
                ) : (
                    <div className="edit-section">
                        <PostForm
                            editingPost={editingPost}
                            onPostSaved={handlePostSaved}
                            onCancel={handleCancel}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
