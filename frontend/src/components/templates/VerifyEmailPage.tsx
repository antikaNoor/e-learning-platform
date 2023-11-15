import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuthHooks';

const VerifyEmailPage = () => {
    const { verifyEmail } = useAuth();
    const navigate = useNavigate();
    const { userId, token } = useParams();

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                // Check if userId and token are defined before calling verifyEmail
                if (userId && token) {
                    // Call the verifyEmail function from your useAuth hook
                    await verifyEmail(userId, token);
                    // Redirect to the login page after successful verification
                    // toast.success('Email verified successfully!');
                    navigate('/login');
                } else {
                    console.error('UserId or token is undefined.');
                }
            } catch (error) {
                // Handle any errors that occur during the verification process
                console.error('Email verification failed:', error);
            }
        };

        // Call the verification function when the component mounts
        verifyUserEmail();
    }, [verifyEmail, userId, token, navigate]); // Add navigate to the dependency array

    return (
        <div>
            {/* Optionally, you can add some UI to inform the user about the verification process */}
            <p>Verifying your email...</p>
            {/* No need for the link to go back to the login page since you're redirecting */}
        </div>
    );
};

export default VerifyEmailPage;
