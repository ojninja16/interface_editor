import React, { useState } from 'react';
import Field from './Field';
import './App.css';

function App() {
  const initialFields = [
    {
      id: 1,
      name: 'Field 1',
      type: 'String',
      value: 'Value 1',
    },
    {
      id: 2,
      name: 'Field 2',
      type: 'Number',
      value: 2,
    },
    {
      id: 3,
      name: 'Field 3',
      type: 'Boolean',
      value: true,
    },
    {
      id: 4,
      name: 'Field 4',
      type: 'Object',
      value: [
        {
          id: 5,
          name: 'Field 5',
          type: 'String',
          value: 'Value 5',
        },
      ],
    },
  ];

  const [fields, setFields] = useState(initialFields);

  const handleAddField = () => {
    const newField = {
      id: Math.floor(Math.random() * 1000),
      name: '',
      type: 'String',
      value: '',
    };
    setFields([...fields, newField]);
  };

  const handleDeleteField = (id) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
  };

  const handleUpdateField = (id, name, value) => {
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          name,
          value,
        };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleAddNestedField = (id) => {
    const newNestedField = {
      id: Math.floor(Math.random() * 1000),
      name: '',
      type: 'String',
      value: '',
    };
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          value: [...field.value, newNestedField],
        };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleUpdateNestedField = (id, nestedId, name, value) => {
    const newFields = fields.map((field) => {
      if (field.id === id && field.type === 'Object') {
        const newNestedFields = field.value.map((nestedField) => {
          if (nestedField.id === nestedId) {
            return {
              ...nestedField,
              name,
              value,
            };
          }
          return nestedField;
        });
        return {
          ...field,
          value: newNestedFields,
        };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleDeleteNestedField = (id, nestedId) => {
    const newFields = fields.map((field) => {
      if (field.id === id && field.type === 'Object') {
        const newNestedFields = field.value.filter(
          (nestedField) => nestedField.id !== nestedId
        );
        return {
          ...field,
          value: newNestedFields,
        };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleSave = () => {
    console.log(fields);
  };

  return (
    <div className="App">
      <h1>Interface Editor</h1>
      {fields.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          name={field.name}
          type={field.type}
          value ={field.value}
onUpdate={handleUpdateField}
onDelete={handleDeleteField}
onAddNestedField={handleAddNestedField}
onUpdateNestedField={handleUpdateNestedField}
onDeleteNestedField={handleDeleteNestedField}
/>
))}
<button onClick={handleAddField}>Add Field</button>
<button onClick={handleSave}>Save</button>
</div>
);
}

export default App;
    
    
    
    
    