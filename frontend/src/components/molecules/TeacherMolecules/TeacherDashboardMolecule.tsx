import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/axiosInstance';
import { useSelector } from 'react-redux';
import Button from '../../atoms/Button';
import { useNavigate } from 'react-router-dom';

type Props = {};

const TeacherDashboardMolecule = (props: Props) => {
    const navigate = useNavigate();

    const state = useSelector((state: any) => state.user);
    const checkString = state.token;

    const [isTeacherApproved, setIsTeacherApproved] = useState(false);

    useEffect(() => {
        const fetchValue = async () => {
            try {
                const data = await axiosInstance.get(`/auth/is-teacher-approved`, {
                    headers: {
                        Authorization: `Bearer ${checkString}`,
                        'Content-Type': 'application/json',
                    },
                });
                setIsTeacherApproved(data.data);
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        };

        fetchValue();
    }, [checkString]);

    console.log(isTeacherApproved);
    return (
        <div className="flex flex-col items-center justify-center">
            {isTeacherApproved ? (
                <h1>Teacher is approved</h1>
            ) : (
                <div className="mx-auto flex flex-col gap-3">
                    <img src="/approval.png" alt="get approval" className='w-1/3 h-1/3 opacity-70' />
                    <p>You have not been approved by the admin yet.</p>
                    <p>Set your information to get approval</p>
                    <Button
                        type="button"
                        value="Get started"
                        additionalStyles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            navigate('/login/teacher');
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default TeacherDashboardMolecule;
