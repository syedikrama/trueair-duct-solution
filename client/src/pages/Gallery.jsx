import React, { useState } from 'react'
import '../styles/galleryStyle.css'

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sample gallery data
    const galleryItems = [
        {
            id: 1,
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
            title: 'Residential Duct Cleaning',
            description: 'Complete cleaning of home ventilation systems'
        },
        {
            id: 2,
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1632773689822-3c30d5051f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tbWVyY2lhbCUyMGh2YWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
            title: 'Commercial HVAC Cleaning',
            description: 'Office building duct maintenance'
        },
        {
            id: 3,
            category: 'dryer',
            image: 'https://images.unsplash.com/photo-1632882001413-801bf290a87c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeWVyJTIwdmVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
            title: 'Dryer Vent Cleaning',
            description: 'Preventing fire hazards through proper maintenance'
        },
        {
            id: 4,
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
            title: 'Before & After Cleaning',
            description: 'Dramatic difference in air quality'
        },
        {
            id: 5,
            category: 'commercial',
            image: 'https://images.unsplash.com/photo-1632773689822-3c30d5051f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tbWVyY2lhbCUyMGh2YWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
            title: 'Restaurant Ventilation',
            description: 'Commercial kitchen duct cleaning'
        },
        {
            id: 6,
            category: 'hvac',
            image: 'https://images.unsplash.com/photo-1616604744535-5b9e9785f77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh2YWMlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
            title: 'HVAC System Maintenance',
            description: 'Complete system cleaning and optimization'
        },
        {
            id: 7,
            category: 'residential',
            image: 'https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
            title: 'Family Home Service',
            description: 'Improving air quality for families'
        },
        {
            id: 8,
            category: 'dryer',
            image: 'https://images.unsplash.com/photo-1632882001413-801bf290a87c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeWVyJTIwdmVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
            title: 'Lint Removal',
            description: 'Thorough lint extraction process'
        },
        {
            id: 9,
            category: 'hvac',
            image: 'https://images.unsplash.com/photo-1616604744535-5b9e9785f77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh2YWMlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
            title: 'System Optimization',
            description: 'Improving HVAC efficiency'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: 'residential', name: 'Residential' },
        { id: 'commercial', name: 'Commercial' },
        { id: 'dryer', name: 'Dryer Vents' },
        { id: 'hvac', name: 'HVAC Systems' }
    ];

    const filteredItems = selectedCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

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
                                                <button className="view-btn">
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
                                <button className="btn btn-primary">Get Free Estimate</button>
                                <button className="btn btn-outline">View All Services</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
             </div>
  );
}