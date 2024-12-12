import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    
    const navigate = useNavigate();

    const { setUser } = useContext(UserDataContext); // Corrected context usage

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user); 
                localStorage.setItem('token',data.token)
                navigate('/home');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error during signup. Please try again.');
        }

        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="RideConnect Logo"
                />
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
                    <div className="flex gap-4 mb-6">
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                            type="text"
                            placeholder="First name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                            type="text"
                            placeholder="Last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <p className="text-[10px] mt-6 leading-tight">
                    This site is protected by reCAPTCHA and the{' '}
                    <span className="underline">Google Privacy Policy</span> and{' '}
                    <span className="underline">Terms of Service apply</span>.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
