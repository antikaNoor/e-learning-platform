import React from 'react';
import { Controller } from 'react-hook-form';

interface ControllerProps {
  name: string;
  control: any;
  defaultValue: string;
  type: string;
}

const ControllerInput: React.FC<ControllerProps> = ({
  name,
  control,
  defaultValue,
  type,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <input
            id={name}
            type={type}
            value={field.value}
            onChange={field.onChange}
          />
          {name === 'role' && <p className="text-gray-600 text-sm mt-2">(Select Role)</p>}
        </>
      )}
    />
  );
};

export default ControllerInput;
