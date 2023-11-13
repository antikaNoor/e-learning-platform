// import React from 'react';

type Props = {
  type: 'button' | 'submit' | 'reset';
  value: string;
  onClick?: () => void;
  additionalStyles?: string;
}

const Button = (props: Props) => {
  return (
    <div className="w-full">
      <button
        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${props.additionalStyles}`}
        type={props.type}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </div>
  );
};

export default Button;