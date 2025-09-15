import React, { useState } from 'react'
import '../styles/galleryStyle.css';
import { Link } from 'react-router-dom';

export default function Gallery() {
    let [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Sample gallery data
    let galleryItems = [
        {
            id: 1,
            category: 'residential',
            image: "/images/gallery_1.jpeg",
            title: 'Residential Duct Cleaning',
            description: 'Complete cleaning of home ventilation systems'
        },
        {
            id: 2,
            category: 'commercial',
            image: "/images/gallery_2.jpeg",
            title: 'Commercial HVAC Cleaning',
            description: 'Office building duct maintenance'
        },
        {
            id: 3,
            category: 'dryer',
            image: "/images/gallery_3.jpeg",
            title: 'Dryer Vent Cleaning',
            description: 'Preventing fire hazards through proper maintenance'
        },
        {
            id: 4,
            category: 'residential',
            image: "/images/gallery_4.jpeg",
            title: 'Before & After Cleaning',
            description: 'Dramatic difference in air quality'
        },
        {
            id: 5,
            category: 'commercial',
            image: "/images/gallery_5.jpeg",
            title: 'Restaurant Ventilation',
            description: 'Commercial kitchen duct cleaning'
        },
        {
            id: 6,
            category: 'hvac',
            image: "/images/gallery_6.jpeg",
            title: 'HVAC System Maintenance',
            description: 'Complete system cleaning and optimization'
        },
        {
            id: 7,
            category: 'residential',
            image: "/images/gallery_7.jpeg",
            title: 'Family Home Service',
            description: 'Improving air quality for families'
        },
        {
            id: 8,
            category: 'dryer',
            image: "/images/gallery_8.jpeg",
            title: 'Lint Removal',
            description: 'Thorough lint extraction process'
        },
        {
            id: 9,
            category: 'hvac',
            image: "/images/gallery_9.jpeg",
            title: 'System Optimization',
            description: 'Improving HVAC efficiency'
        }
    ];

    let categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'residential', name: 'Residential' },
        { id: 'commercial', name: 'Commercial' },
        { id: 'dryer', name: 'Dryer Vents' },
        { id: 'hvac', name: 'HVAC Systems' }
    ];

    let filteredItems = selectedCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

    const openModal = (item) => {
        setSelectedImage(item);
        setShowModal(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="gallery-page">
            {/* Hero Section */}
            <section className="gallery-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h1 className="gallery-title">Our Work Gallery</h1>
                            <p className="gallery-subtitle">
                                Browse through our completed projects and see the quality of our air duct cleaning services
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="filter-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="filter-buttons">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="gallery-grid-section">
                <div className="container">
                    <div className="row">
                        {filteredItems.map(item => (
                            <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="gallery-item">
                                    <div className="gallery-image-container">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="gallery-image"
                                        />
                                        <div className="gallery-overlay">
                                            <div className="gallery-content">
                                                <h5 className="gallery-item-title">{item.title}</h5>
                                                <p className="gallery-item-description">{item.description}</p>
                                                <button 
                                                    className="view-btn"
                                                    onClick={() => openModal(item)}
                                                >
                                                    <i className="fas fa-search-plus"></i> View Larger
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="gallery-cta">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2>Ready to Improve Your Air Quality?</h2>
                            <p>Schedule your air duct cleaning service today and breathe easier tomorrow</p>
                            <div className="cta-buttons">
                                <Link to={`/contact`}>
                                    <button className="btn btn-primary">Get Free Estimate</button>
                                </Link>
                                <Link to={`/services`}>
                                    <button className="btn btn-outline">View All Services</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {showModal && selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="modal-image-container">
                            <img 
                                src={selectedImage.image} 
                                alt={selectedImage.title} 
                                className="modal-image"
                            />
                        </div>
                        <div className="modal-details">
                            <h3>{selectedImage.title}</h3>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}