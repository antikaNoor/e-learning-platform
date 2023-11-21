import React, { useState } from 'react';

const DynamicInputField = () => {
    const [inputFields, setInputFields] = useState([]);

    const addInputField = () => {
        setInputFields([...inputFields, { id: inputFields.length }]);
    };

    const removeInputField = (id) => {
        setInputFields(inputFields.filter(field => field.id !== id));
    };

    return (
        <div>
            <div onClick={addInputField}>Add Input Field</div>
            {inputFields.map((field) => (
                <div key={field.id}>
                    <input type="text" name={`input_${field.id}`} />
                    <div onClick={() => removeInputField(field.id)}>Remove Input Field</div>
                </div>
            ))}
        </div>
    );
};

export default DynamicInputField;
