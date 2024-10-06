import { useState } from "react";

const CreateMeal = () => {
    const [meal, setMeal] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal((prev) => ({
        ...prev,
        [name]: value,
        }));
    };
    
    
    return (
        <form>
        <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleChange}
            placeholder="Name"
        />
        <input
            type="text"
            name="description"
            value={meal.description}
            onChange={handleChange}
            placeholder="Description"
        />
        <input
            type="number"
            name="price"
            value={meal.price}
            onChange={handleChange}
            placeholder="Price"
        />
        <input
            type="text"
            name="category"
            value={meal.category}
            onChange={handleChange}
            placeholder="Category"
        />
        <button type="submit">Create Meal</button>
        </form>
    );
    };

    export default CreateMeal;