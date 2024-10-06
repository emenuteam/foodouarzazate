import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CategoryRow from "./CategoryRow";
import "./AllCategories.css";

// API endpoint constant
const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL;
const API_URL = `${GLOBAL_URL}/api/categories`;

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setCategoryForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingIndex === -1) {
        await axios.post(API_URL, categoryForm);
        Swal.fire("Success", "Category added successfully!", "success");
      } else {
        const { id } = categories[editingIndex];
        await axios.put(`${API_URL}/${id}`, categoryForm);
        Swal.fire("Success", "Category updated successfully!", "success");
        setEditingIndex(-1);
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Failed to add/update category", error);
      Swal.fire("Error", "Failed to add/update category.", "error");
    }
  };

  const handleEdit = (index) => {
    setCategoryForm(categories[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const { id, name } = categories[index];
    try {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: `Are you sure you want to delete the category "${name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire("Deleted", "Category deleted successfully!", "success");
        fetchCategories();
      }
    } catch (error) {
      console.error("Failed to delete category", error);
      Swal.fire("Error", "Failed to delete category.", "error");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setEditingIndex(-1);
  };

  const resetForm = () => {
    setCategoryForm({ name: "", description: "" });
  };

  return (
    <div className="content d-flex flex-row-reverse align-items-start">
      <form
        onSubmit={handleSubmit}
        className="category-form d-flex flex-column gap-2"
      >
        <h4>{editingIndex === -1 ? "New Category" : "Edit Category"}</h4>
        <div className="mb-3 px-1">
          <input
            type="text"
            className="form-control"
            name="name"
            value={categoryForm.name}
            onChange={handleInputChange}
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-3 px-1">
          <textarea
            className="form-control"
            name="description"
            value={categoryForm.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
        <div className="d-flex update-add-category-btn">
          <button
            type="submit"
            className={`btn btn-primary ${
              editingIndex === -1 ? "w-100" : "w-50"
            }`}
          >
            {editingIndex === -1 ? "Add Category" : "Update Category"}
          </button>
          {editingIndex !== -1 && (
            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="categories d-flex flex-column justify-content-start align-items-center gap-3">
        <h4>All Categories</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <CategoryRow
                key={category.id} // Use a unique key for each row
                category={category}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategories;
