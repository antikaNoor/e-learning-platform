import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '../atoms/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';
// import useAuth from '../../hooks/useAuthHooks';
import { ResetPasswordApi, ValidateResetPasswordApi } from '../../ApiCalls/AuthApi';

type FormData = {
    newPassword: string;
    confirmPassword: string;
};

type BoxProps = {
    className?: string;
};

const ResetPasswordBoxMolecule = ({ className }: BoxProps) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });

    // const { resetPassword, validateResetPassword } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data: FormData) => {
        console.log(data);
        // await ValidateResetPasswordApi();
        // await ResetPasswordApi(data);
    };

    return (
        <div className={`max-w-md p-4 rounded-lg shadow-lg flex flex-col justify-center h-[95vh] ${className}`}>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Create a New Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                {/* form items container */}
                <div>
                    <label>Password</label>
                    <Controller
                        name="newPassword"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
                                message:
                                    'Password must contain at least one capital letter, one digit, one special character, and be 8 characters or more long.',
                            },
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    placeholder="Enter password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                    className={`w-full px-4 py-2 border rounded ${errors.newPassword ? 'border-red-500' : ''}`}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-6 w-6 text-gray-500" />
                                    ) : (
                                        <FiEye className="h-6 w-6 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        )}
                    />
                    {errors.newPassword && <h5 className="text-red-500">{errors.newPassword.message}</h5>}
                </div>

                <div>
                    <label>Confirm Password</label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                            required: 'Confirm your password',
                            validate: (value) =>
                                value === watch('newPassword') || 'Confirm password should match given password',
                        }}
                        render={({ field }) => (
                            <div className="relative">
                                <input
                                    placeholder="Confirm password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...field}
                                    className={`w-full px-4 py-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff className="h-6 w-6 text-gray-500" />
                                    ) : (
                                        <FiEye className="h-6 w-6 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        )}
                    />
                    {errors.confirmPassword && (
                        <div className="mt-2">
                            <h5 className="text-red-500">{errors.confirmPassword.message}</h5>
                        </div>
                    )}
                </div>

                <div className="text-center flex flex-col justify-center">
                    <Button type="submit" value="Reset Password" additionalStyles="bg-gray-500 hover:bg-gray-700 text-white font-bold w-full mt-4" />
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordBoxMolecule;
