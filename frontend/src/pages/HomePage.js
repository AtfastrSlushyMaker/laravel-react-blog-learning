import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import '../styles/components/HomePage.css';

const HomePage = () => {
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedPosts();
    }, []);

    const fetchFeaturedPosts = async () => {
        try {
            const response = await postsAPI.getAllPosts();
            // Get the latest 3 posts for featured section
            setFeaturedPosts(response.data.slice(0, 3));
        } catch (err) {
            console.error('Failed to fetch featured posts:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to My Blog</h1>
                    <p className="hero-subtitle">
                        Discover amazing stories, insights, and ideas from our community of writers
                    </p>                    <div className="hero-actions">
                        <Link to="/blog" className="btn btn-primary btn-large">
                            <i className="fas fa-newspaper"></i> Start Reading
                        </Link>
                        <Link to="/create" className="btn btn-outline btn-large">
                            <i className="fas fa-pen-nib"></i> Write a Post
                        </Link>
                    </div>                </div>
                <div className="hero-image">
                    <div className="hero-icon">
                        <i className="fas fa-blog"></i>
                        <h3>My Blog</h3>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <i className="fas fa-file-alt stat-icon"></i>
                            <h3 className="stat-number">{featuredPosts.length}+</h3>
                            <p className="stat-label">Published Posts</p>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-users stat-icon"></i>
                            <h3 className="stat-number">1</h3>
                            <p className="stat-label">Active Writers</p>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-lightbulb stat-icon"></i>
                            <h3 className="stat-number">∞</h3>
                            <p className="stat-label">Ideas Shared</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts Section */}
            <section className="featured-posts">
                <div className="container">
                    <h2 className="section-title">Latest Posts</h2>

                    {loading ? (
                        <div className="loading">Loading latest posts...</div>
                    ) : (
                        <div className="posts-grid">
                            {featuredPosts.length > 0 ? (
                                featuredPosts.map(post => (
                                    <div key={post.id} className="post-card">
                                        <div className="post-header">
                                            <h3 className="post-title">{post.title}</h3>
                                            <span className={`post-status status-${post.status}`}>
                                                {post.status}
                                            </span>
                                        </div>
                                        <p className="post-excerpt">
                                            {post.content.length > 120
                                                ? `${post.content.substring(0, 120)}...`
                                                : post.content
                                            }
                                        </p>
                                        <div className="post-meta">
                                            <span className="post-author">
                                                By {post.user?.name || 'Anonymous'}
                                            </span>
                                            <span className="post-date">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-posts">
                                    <h3>No posts yet!</h3>
                                    <p>Be the first to share your story.</p>
                                    <Link to="/create" className="btn btn-primary">
                                        Create First Post
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {featuredPosts.length > 0 && (
                        <div className="section-footer">
                            <Link to="/blog" className="btn btn-outline">
                                View All Posts →
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Share Your Story?</h2>
                        <p>Join our community and start writing today</p>
                        <Link to="/create" className="btn btn-primary btn-large">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;