// import React from 'react'

type WelcomeBoxProps = {
    className?: string;
};

const WelcomeBox = ({ className }: WelcomeBoxProps) => {
    const imageUrl = 'https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <div className={`relative max-w-md p-4 rounded-lg shadow-lg h-[95vh] ${className}`}>
            <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* Welcome text with transparent box and faster typing animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-40 p-4 rounded-lg overflow-hidden">
                        <h2 className="text-3xl font-bold text-gray-800 overflow-hidden">
                            <span className="typing-animation">Welcome to Renaissance!</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBox