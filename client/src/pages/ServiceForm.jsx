import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/serviceFormStyle.css";

export default function ServiceForm({ onSuccess, editingService }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    benefits: "",
    process: "",
    price: "",
    duration: "",
    coverage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Pre-fill form if editingService exists
  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title || "",
        image: editingService.image || "",
        description: editingService.description || "",
        benefits: (editingService.benefits || []).join(", "),
        process: (editingService.process || []).join(", "),
        price: editingService.price || "",
        duration: editingService.duration || "",
        coverage: editingService.coverage || "",
      });
    } else {
      setFormData({
        title: "",
        image: "",
        description: "",
        benefits: "",
        process: "",
        price: "",
        duration: "",
        coverage: "",
      });
    }
  }, [editingService]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        benefits: formData.benefits.split(",").map((b) => b.trim()),
        process: formData.process.split(",").map((p) => p.trim()),
      };

      let res;
      if (editingService) {
        // Update existing service
        res = await axios.put(
          `http://localhost:3001/api/services/${editingService._id}`,
          payload
        );
        setMessage("✅ Service updated successfully!");
      } else {
        // Add new service
        res = await axios.post("http://localhost:3001/api/services", payload);
        setMessage("✅ Service added successfully!");
      }

      setFormData({
        title: "",
        image: "",
        description: "",
        benefits: "",
        process: "",
        price: "",
        duration: "",
        coverage: "",
      });

      if (onSuccess) onSuccess(res.data); // notify parent
    } catch (error) {
      console.error("Error saving service:", error);
      setMessage("❌ Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-form">
      <h2>{editingService ? "Edit Service" : "Add New Service"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="benefits"
          placeholder="Benefits (comma separated)"
          value={formData.benefits}
          onChange={handleChange}
        />
        <input
          type="text"
          name="process"
          placeholder="Process Steps (comma separated)"
          value={formData.process}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coverage"
          placeholder="Coverage"
          value={formData.coverage}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingService ? "Update Service" : "Add Service"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
