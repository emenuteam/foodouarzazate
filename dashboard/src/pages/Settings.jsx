import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./Settings.scss";

const Settings = () => {
	const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL;

	const [message, setMessage] = useState("");
	const [imageSrc, setImageSrc] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [imageUpload, setImageUpload] = useState(null);
	const [errorimg, setErrorimg] = useState('');
  
  const [formData, setFormData] = useState({
    websiteLogo: null,
    email_address: "",
    fax_phone: "",
    physical_address: "",
    instagram_link: "",
    facebook_link: "",
	bg_image: null,
	restaurant_name: "",
	subheading: "",
	// server: "",
	// facture: ""
  });
 
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${GLOBAL_URL}/api/restaurants`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const restaurant = data[0]; // Assuming you only need the first restaurant
            setFormData({
              id: restaurant.id, // Include the ID for the update
              // websiteLogo: restaurant.website_logo,
              email_address: restaurant.email_address,
              fax_phone: restaurant.fax_phone,
              physical_address: restaurant.physical_address,
              instagram_link: restaurant.instagram_link,
              facebook_link: restaurant.facebook_link,
			  restaurant_name: restaurant.restaurant_name,
			  subheading: restaurant.subheading,
			//   server: restaurant.server,
			//   facture: restaurant.facture
            });
            setImageSrc(`${GLOBAL_URL}/storage/${restaurant.website_logo}`);
			setImagePreview(`${GLOBAL_URL}/storage/${restaurant.bg_image}`);
          }
        } else {
          setMessage("Failed to fetch data.");
          console.error("Error fetching data: ", response.statusText);
        }
      } catch (error) {
        setMessage("An error occurred while fetching data.");
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle file upload and set image source
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        websiteLogo: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "websiteLogo") {
      setFormData({
        ...formData,
        websiteLogo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleImageChange = (e) => {
	const { id, value, files } = e.target;
      setFormData({
        ...formData,
        bg_image: files[0],
      });
	  setImagePreview(URL.createObjectURL(files[0]));
  };
  const handleButtonClick = () => {
	document.getElementById('hidden-file-input').click();
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = formData;
	console.log(data);
	
    try {
        const response = await axios.post(`${GLOBAL_URL}/api/restaurants`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setMessage(response.data.message || "Settings updated successfully.");
    } catch (error) {
        setMessage("An error occurred. Please try again.");
        console.error("Submission error: ", error);
    }
};

  return (
		<>
			<div className="content">
				<div className="container container-settings">
					{/* <h2 className="">Settings</h2> */}
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						<div className="row">
							{/* Left Column: Logo and Contact Information */}
							<div className="col-md-12">
								<div className="profile-pic">
									<label className="-label" htmlFor="file">
										<span className="glyphicon glyphicon-camera"></span>
										<span>Change Logo</span>
									</label>
									<input id="file" accept="image/*" type="file" onChange={handleFileChange} />
									<img
										src={
											imageSrc ||
											"data:image/png;base64,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"
										}
										alt="Logo Preview"
										id="output"
										width="100"
									/>
								</div>
							</div>
							<div className="col-md-6">
								{/* Website Logo Upload */}
								{/* <div className="form-group">
                                    <label htmlhtmlFor="websiteLogo">Change Website Logo (Required)</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="websiteLogo"
                                        onChange={handleChange}
                                    />
                                </div> */}

								{/* Contact Information */}
								<h4 className="mt-3">Contact Information</h4>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-map-marker-alt"></i>
											</span>
										</div>
										<input type="text" className="form-control" id="physical_address" value={formData.physical_address} onChange={handleChange} placeholder="Enter Physical Address" />
									</div>
								</div>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-envelope"></i>
											</span>
										</div>
										<input type="email" className="form-control" id="email_address" value={formData.email_address} onChange={handleChange} placeholder="Enter Email Address" />
									</div>
								</div>


								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-phone"></i>
											</span>
										</div>
										<input type="tel" className="form-control" id="fax_phone" value={formData.fax_phone} onChange={handleChange} placeholder="Enter Phone Number" />
									</div>
								</div>
								{/* <div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
											<i class="fa-solid fa-headset"></i>
											</span>
										</div>
										<input type="tel" className="form-control" id="server" value={formData.server} onChange={handleChange} placeholder="Enter Server Number" />
									</div>
								</div> */}
								{/* <div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
											<i class="fa-solid fa-file-contract"></i>
											</span>
										</div>
										<input type="tel" className="form-control" id="facture" value={formData.facture} onChange={handleChange} placeholder="Enter Facture Number" />
									</div>
								</div> */}
								<h4 className="mt-4">Social Media Links</h4>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fab fa-instagram"></i>
											</span>
										</div>
										<input type="url" className="form-control" id="instagram_link" value={formData.instagram_link} onChange={handleChange} placeholder="Enter Instagram URL" />
									</div>
								</div>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fab fa-facebook-f"></i>
											</span>
										</div>
										<input type="url" className="form-control" id="facebook_link" value={formData.facebook_link} onChange={handleChange} placeholder="Enter Facebook URL" />
									</div>
								</div>
							</div>

							{/* Right Column: Social Media Links */}
							<div className="col-md-6">
								<h4 className="mt-4">Home Information</h4>
								<div className="form-group row">
									<div className="col-md-6">
										<input 
										type="text" 
										className="form-control" 
										id="restaurant_name" 
										value={formData.restaurant_name} 
										onChange={handleChange} 
										placeholder="Enter Restaurant Name" 
										/>
									</div>
									
									<div className="col-md-6">
										<input 
										type="text" 
										className="form-control" 
										id="subheading" 
										value={formData.subheading} 
										onChange={handleChange} 
										placeholder="Enter Subheading" 
										/>
									</div>
									</div>
									<div className="mb-3 px-1 upload-container">
										<input
											type="file"
											id="hidden-file-input"
											name="image"
											accept="image/*"
											className="hidden-file-input"
											onChange={handleImageChange}
											
										/>
										<button type="button" className="custom-upload-btn"  onClick={handleButtonClick} >
											Upload bg-Image
										</button>
										{imagePreview && (
											<img src={imagePreview} alt="Preview" className="img-preview" /> 
										)} 
									</div>

								


							</div>
						</div>

						{/* Submit Button Centered */}
						<div className="row">
							<div className="col-md-12 d-flex justify-content-end">
								<button type="submit" className="btn btn-primary mt-4">
									Save Changes
								</button>
							</div>
						</div>
					</form>

					{/* Display a message after submission */}
					{message && <div className="mt-3 alert alert-info">{message}</div>}
				</div>
			</div>
		</>
  );
};

export default Settings;
