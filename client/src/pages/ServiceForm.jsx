// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "../styles/serviceFormStyle.css";

// export default function ServiceForm({ onSuccess, editingService }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     description: "",
//     benefits: "",
//     process: "",
//     price: "",
//     duration: "",
//     coverage: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Pre-fill form if editingService exists
//   useEffect(() => {
//     if (editingService) {
//       setFormData({
//         title: editingService.title || "",
//         image: editingService.image || "",
//         description: editingService.description || "",
//         benefits: (editingService.benefits || []).join(", "),
//         process: (editingService.process || []).join(", "),
//         price: editingService.price || "",
//         duration: editingService.duration || "",
//         coverage: editingService.coverage || "",
//       });
//     } else {
//       setFormData({
//         title: "",
//         image: "",
//         description: "",
//         benefits: "",
//         process: "",
//         price: "",
//         duration: "",
//         coverage: "",
//       });
//     }
//   }, [editingService]);

//   // handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         ...formData,
//         benefits: formData.benefits.split(",").map((b) => b.trim()),
//         process: formData.process.split(",").map((p) => p.trim()),
//       };

//       let res;
//       if (editingService) {
//         // Update existing service
//         res = await axios.put(
//           `http://localhost:3001/api/services/${editingService._id}`,
//           payload
//         );
//         setMessage("✅ Service updated successfully!");
//       } else {
//         // Add new service
//         res = await axios.post("http://localhost:3001/api/services", payload);
//         setMessage("✅ Service added successfully!");
//       }

//       setFormData({
//         title: "",
//         image: "",
//         description: "",
//         benefits: "",
//         process: "",
//         price: "",
//         duration: "",
//         coverage: "",
//       });

//       if (onSuccess) onSuccess(res.data); // notify parent
//     } catch (error) {
//       console.error("Error saving service:", error);
//       setMessage("❌ Failed to save service");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="service-form">
//       <h2>{editingService ? "Edit Service" : "Add New Service"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Service Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL"
//           value={formData.image}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="benefits"
//           placeholder="Benefits (comma separated)"
//           value={formData.benefits}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="process"
//           placeholder="Process Steps (comma separated)"
//           value={formData.process}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="duration"
//           placeholder="Duration"
//           value={formData.duration}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="coverage"
//           placeholder="Coverage"
//           value={formData.coverage}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Saving..." : editingService ? "Update Service" : "Add Service"}
//         </button>
//       </form>

//       {message && <p className="form-message">{message}</p>}
//     </div>
//   );
// }



















































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
    packages: [] // ✅ Naya field packages ke liye
  });

  const [packages, setPackages] = useState([
    { name: "", price: "", features: "", isPopular: false }
  ]);
  
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
      
      // ✅ Packages pre-fill karo
      if (editingService.packages && editingService.packages.length > 0) {
        setPackages(editingService.packages.map(pkg => ({
          name: pkg.name || "",
          price: pkg.price || "",
          features: (pkg.features || []).join(", "),
          isPopular: pkg.isPopular || false
        })));
      }
    }
  }, [editingService]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Package fields handle karo
  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  // ✅ Naya package add karo
  const addPackage = () => {
    setPackages([...packages, { name: "", price: "", features: "", isPopular: false }]);
  };

  // ✅ Package remove karo
  const removePackage = (index) => {
    if (packages.length > 1) {
      const updatedPackages = packages.filter((_, i) => i !== index);
      setPackages(updatedPackages);
    }
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
      // ✅ Packages ko format karo
      packages: packages.map(pkg => ({
        name: pkg.name,
        price: Number(pkg.price),
        features: pkg.features.split(",").map(f => f.trim()),
        isPopular: pkg.isPopular
      }))
    };

    let res;
    if (editingService) {
      res = await axios.put(
        `http://localhost:3001/api/services/${editingService._id}`,
        payload
      );
      setMessage("✅ Service updated successfully!");
    } else {
      res = await axios.post("http://localhost:3001/api/services", payload);
      setMessage("✅ Service added successfully!");
    }

    // ✅ SAHI TAREEQE SE RESET KARO
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
    setPackages([{ name: "", price: "", features: "", isPopular: false }]); // ✅ PACKAGES BHI RESET

    if (onSuccess) onSuccess(res.data);
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
        {/* Existing fields */}
        <input type="text" name="title" placeholder="Service Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="benefits" placeholder="Benefits (comma separated)" value={formData.benefits} onChange={handleChange} />
        <input type="text" name="process" placeholder="Process Steps (comma separated)" value={formData.process} onChange={handleChange} />
        <input type="text" name="price" placeholder="Base Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
        <input type="text" name="coverage" placeholder="Coverage" value={formData.coverage} onChange={handleChange} required />

        {/* ✅ Packages Section */}
        <div className="packages-section">
          <h3>Packages</h3>
          {packages.map((pkg, index) => (
            <div key={index} className="package-form">
              <h4>Package {index + 1}</h4>
              
              <input
                type="text"
                placeholder="Package Name"
                value={pkg.name}
                onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                required
              />
              
              <input
                type="number"
                placeholder="Package Price"
                value={pkg.price}
                onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                required
              />
              
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={pkg.features}
                onChange={(e) => handlePackageChange(index, 'features', e.target.value)}
                required
              />
              
              <label>
                <input
                  type="checkbox"
                  checked={pkg.isPopular}
                  onChange={(e) => handlePackageChange(index, 'isPopular', e.target.checked)}
                />
                Popular Package
              </label>
              
              {packages.length > 1 && (
                <button type="button" onClick={() => removePackage(index)} className="btn-remove">
                  Remove Package
                </button>
              )}
            </div>
          ))}
          
          <button type="button" onClick={addPackage} className="btn-add">
            + Add Another Package
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editingService ? "Update Service" : "Add Service"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}

      <style jsx>{`
        .packages-section {
          margin: 2rem 0;
          padding: 1.5rem;
          border: 2px dashed #ddd;
          border-radius: 10px;
        }
        
        .package-form {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border: 1px solid #eee;
          border-radius: 8px;
        }
        
        .btn-add, .btn-remove {
          padding: 0.5rem 1rem;
          margin: 0.5rem 0;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        .btn-add {
          background: #28a745;
          color: white;
        }
        
        .btn-remove {
          background: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
}