import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  value: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, value, onClick }) => {
  return (
    <div className="button-container">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type={type}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
