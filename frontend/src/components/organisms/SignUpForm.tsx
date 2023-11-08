import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../atoms/InputText';

const SignUpForm: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            role: "student",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form is submitted ");
        console.log("Username ", data.username);
        console.log("Email ", data.email);
        console.log("Role ", data.role);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput name="username" control={control} defaultValue="" type="text" />
            {errors.username && <h5 className="text">{errors.username.message}</h5>}
            <TextInput name="email" control={control} defaultValue="" type="text" />
            <TextInput name="password" control={control} defaultValue="" type="password" />
            <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                </label>
                <TextInput name="role" control={control} defaultValue="student" type="select" />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign Up
            </button>
        </form>
    );
};

export default SignUpForm;
