import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import './Meals.css';
import { type } from 'jquery';

const AllMeals = () => {
    const [meals, setMeals] = useState([]);
    const [newMeal, setNewMeal] = useState({ name: '', price:null});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [errorimg, setErrorimg] = useState('');
   
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [editIndex, setEditIndex] = useState(-1);
    const Global_URL = import.meta.env.VITE_GLOBAL_URL;

    const API_URL = `${Global_URL}/api/meals`;
    const API_URL_category = `${Global_URL}/api/categories`;

    useEffect(()=>{
        fetchMeals();
        fetchCategories();
    },[]);
    

      const fetchMeals = async () => {
        try {
            const { data } = await axios.get(API_URL);
            const meals = data.filter(meal => meal.type === 'meal');
            setMeals(meals);
            // console.log("meals", meals);
        } catch (error) {
            console.error("Failed to fetch meals", error);
        }
    };

    const fetchCategories = async () => {
        try {
          const { data } = await axios.get(API_URL_category);
          setCategories(data);
        //   console.log("data",data);
          
        } catch (error) {
          console.error("Failed to fetch categories", error);
        }
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMeal({ ...newMeal, [name]: value });
    };
    const handleInputChangecategory = (event) => {
        setSelectedCategory(event.target.value);

    };
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const maxFileSizeMB = 2;

      if (file) {
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxFileSizeMB) {
          setErrorimg(
            `Image size should be less than ${maxFileSizeMB}MB.`
          );
          setImageUpload(null);
          setImagePreview(null);
        } else {
          setErrorimg("");
          setImageUpload(file);
          setImagePreview(URL.createObjectURL(file));
        }
      }
    };

    const handleAddMeal = async (e) => {
        e.preventDefault();
    
        // Create a new FormData object to handle file uploads
        // const formData = new FormData();
        // formData.append('name', newMeal.name);
        // formData.append('description', newMeal.description);
        // formData.append('price', newMeal.price);
        // formData.append('category_id', selectedCategory);
        // formData.append('image', imageUpload); // file itself
        const formData= {
            name: newMeal.name,
            price: newMeal.price,
            category_id: selectedCategory,
            image: imageUpload,
            type: 'meal'
        }
        try {
            if (editIndex === -1) {
                // POST request to create a new meal
                await axios.post(API_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                Swal.fire("Success", "Meal added successfully!", "success");
            } else {
                console.log("daaaata",formData);
                
                // PUT request to update an existing meal
                await axios.post(`${API_URL}/${meals[editIndex].id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                Swal.fire("Success", "Meal updated successfully!", "success");
                setEditIndex(-1);
            }
    
            fetchMeals();
            handleCancelEdit();
            setImagePreview(null);
    
        } catch (error) {
            console.error("Failed to add/update meal", error);
            Swal.fire("Error", "Failed to add/update meal.", "error");
        }
    };
    
    


    const handleEditMeal = (index) => {
        const mealToEdit = meals[index];
        setNewMeal(mealToEdit);
        setSelectedCategory(mealToEdit.category.id);
        setImagePreview(null);
        setEditIndex(index);
    };

    const handleDeleteMeal = async (id,name) => {
        try {
            const result = await Swal.fire({
                title: "Confirm Deletion",
                text: `Are you sure you want to delete the meal "${name}"?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel",
              });
              if (result.isConfirmed) {
                await axios.delete(`${API_URL}/${id}`);
                Swal.fire("Success", "Meal delete successfully!", "success");
                fetchMeals();
              }
        } catch (error) {
            console.error("Failed to fetch meals", error);
            Swal.fire("Error", "Failed to delete meal.", "error");

        }

    };
    // const handleDeleteMeal = (index) => {
    //     const updatedMeals = [...meals];
    //     updatedMeals.splice(index, 1);
    //     setMeals(updatedMeals);
    // };
    const toggleAvailability = async (id) => {
        try{
            await axios.patch(`${API_URL}/${id}/availability`);
            fetchMeals();

        }catch(error){
            console.error("Failed to hide/show meal", error);
            Swal.fire("Error", "Failed to hide/show meal.", "error");
        }
    }

    const handleButtonClick = () => {
        document.getElementById('hidden-file-input').click();
    };

    const handleCancelEdit = () => {
        setNewMeal({ name: '', price:null });
        setEditIndex(-1);
    };

    return (
        <div className="meals-container">
            <div className="meals">
                <h4>All Meals</h4>
                <table className="meal-table table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, index) => (
                            <tr key={index}>
                                <td><img className='img-meals-list' src={`${Global_URL}/storage/${meal.image_url}`} alt={meal.image_url} /></td>
                                {/* <td>{meal.image}</td> */}
                                <td title={meal.name}>
                                {meal.name.length > 15
                                        ? `${meal.name.substring(0, 15)}...`
                                        : meal.name}
                                </td>
                                <td>{meal.price}</td>
                                <td>{meal.category.name}</td>
                                <td>
                                    <button className="btn hide-meals" onClick={() => toggleAvailability(meal.id)}>
                                        {meal.availability === 1 ? (

                                            <i className="fa-solid fa-eye"></i>
                                        ):(
                                            <i class="fa-solid fa-eye-slash"></i>

                                        )}
                                    </button>
                                    <button onClick={() => handleEditMeal(index)} className="btn edit-meals">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDeleteMeal(meal.id,meal.name)} className="btn delete-meals">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleAddMeal} className="meal-form" enctype="multipart/form-data">
                <h4>{editIndex === -1 ? 'Add Meal' : 'Edit Meal'}</h4>
                <div className="mb-3 px-1">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Meal Name"
                        value={newMeal.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 px-1">
                    <input
                        type="number"
                        step="0.01"
                        min={1}
                        name="price"
                        className="form-control"
                        placeholder="Meal price"
                        value={newMeal.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 px-1">
                    <select
                         name="category"
                         className="form-control"
                         value={selectedCategory}  // Use the selectedCategory state
                         onChange={handleInputChangecategory}
                         id="category-select"
                    >
                       <option value="" disabled>Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
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
                    <button type="button" className="custom-upload-btn" onClick={handleButtonClick}>
                        Upload Image
                    </button>
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="img-preview" />
                    )}
                </div>
                    {errorimg && <p style={{ color: 'red' }}>{errorimg}</p>}
                <div className="d-flex update-add-meal-btn">

                <button type="submit" className={`btn btn-primary ${editIndex === -1 ? 'w-100' : 'w-50'}`}>
                    {editIndex === -1 ? 'Add Meal' : 'Update Meal'}
                </button>
                {editIndex !== -1 && (
                        <button type="button" className="btn btn-secondary cancel-edit-meal w-50" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                    </div>
            </form>
        </div>
    );
};

export default AllMeals;
