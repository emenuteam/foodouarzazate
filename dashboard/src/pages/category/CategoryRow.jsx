import React from "react";

const CategoryRow = ({ category, onEdit, onDelete }) => {
  // Truncate description to 16 characters with ellipsis if necessary
  const truncatedDescription = category.description && category.description.length > 16 ? `${category.description.slice(0, 16)}...` : category.description ? category.description : "No description";

  return (
    <tr className="text-center">
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td title={category.description}>{truncatedDescription}</td>
      <td>
        <div className="btn-group" role="group">
          <button type="button" className="btn modify-btn" onClick={onEdit}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button type="button" className="btn delete-btn" onClick={onDelete}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
