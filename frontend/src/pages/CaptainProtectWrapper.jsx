import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        // Fetch captain profile
        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setCaptain(data.captain);
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
