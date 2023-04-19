import React from 'react';

function Field(props) {
  const { id, name, type, value, onUpdate, onDelete, onAddNestedField, onUpdateNestedField, onDeleteNestedField } = props;

  const handleUpdate = (e) => {
    onUpdate(id, e.target.name, e.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleAddNestedField = () => {
    onAddNestedField(id);
  };

  const handleUpdateNestedField = (nestedId, e) => {
    onUpdateNestedField(id, nestedId, e.target.name, e.target.value);
  };

  const handleDeleteNestedField = (nestedId) => {
    onDeleteNestedField(id, nestedId);
  };

  if (type === 'String' || type === 'Number' || type === 'Boolean') {
    return (
      <div>
        <label htmlFor={name}>{name}</label>
        <input
          type={type === 'Boolean' ? (
        <input
          type="checkbox"
          checked={value}
          onChange={value.handleCheckboxChange}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={value.handleInputChange}
        />
      )}
          id={name}
          name={name}
          value={value}
          checked={type === 'Boolean' ? value : undefined}
          onChange={handleUpdate}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }

  if (type === 'Object') {
    return (
      <div>
        <h2>{name}</h2>
        {value.map((nestedField) => (
          <Field
            key={nestedField.id}
            id={nestedField.id}
            name={nestedField.name}
            type={nestedField.type}
            value={nestedField.value}
            onUpdate={(name, value) => handleUpdateNestedField(nestedField.id, { name, value })}
            onDelete={() => handleDeleteNestedField(nestedField.id)}
          />
        ))}
        <button onClick={handleAddNestedField}>Add Field</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  }

  return null;
}

export default Field;

