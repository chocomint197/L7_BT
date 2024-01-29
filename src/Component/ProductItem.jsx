import React, { useState, useEffect } from "react";
export default function ProductItem(props) {
  const { item, onDelete, onToggleStatus, checked } = props;
  useEffect(() => {
    setBoxCheck(checked);
  }, [checked]);

  const [boxCheck, setBoxCheck] = useState(checked);

  const handleDelete = () => {
    onDelete(item.id);
  };

  const checkBoxChange = () => {
    setBoxCheck(!boxCheck);
    onToggleStatus(item.id, boxCheck ? "uncomplete" : "complete");
  };

  return (
    <div className="list">
      <div className={`list-body ${boxCheck ? "active" : ""}`}>
        <input type="checkbox" checked={boxCheck} onChange={checkBoxChange} />
        <h4 className="list-title">{item.name}</h4>
        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
