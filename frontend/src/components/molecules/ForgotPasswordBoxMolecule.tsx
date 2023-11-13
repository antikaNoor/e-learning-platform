import { useForm, Controller } from 'react-hook-form';
import Button from '../atoms/Button';
import useAuth from '../../hooks/useAuthHooks';

type FormData = {
    recipient: string;
};

type BoxProps = {
    className?: string;
};

const ForgotPasswordBoxMolecule = ({ className }: BoxProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            recipient: ''
        },
    });

    const { forgotPassword } = useAuth();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        await forgotPassword(data);
    };

    return (
        <div className={`max-w-md p-4 rounded-lg shadow-lg flex flex-col justify-center h-[95vh] ${className}`}>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Enter Your Email</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                {/* form items container */}
                <div>
                    <label>Email</label>
                    <Controller
                        name="recipient"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                message: 'Enter a valid email address.',
                            },
                        }}
                        render={({ field }) => (
                            <input
                                placeholder="Enter email"
                                {...field}
                                className={`w-full px-4 py-2 border rounded ${errors.recipient ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.recipient && <h5 className="text-red-500">{errors.recipient.message}</h5>}
                </div>

                <div className='text-center flex flex-col justify-center'>
                    <Button type="submit" value="Submit" additionalStyles="w-full mt-4" />
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordBoxMolecule;
