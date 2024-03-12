// import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [res, setRes] = useState('');

    // useEffect(async () => {});

    useEffect(() => {
        const test = async () => {
            await axios
                .get(`${import.meta.env.VITE_APP_BACKEND_URL}/test`)
                .then((response) => setRes(response.data))
                .catch((err) => {
                    console.log('err ' + err);
                });
            // setRes(response.data);
        };
        test();
    }, []);

    return (
        <div className='p-2 flex flex-col gap-3 justify-center items-center'>
            <span>Welcome to Link Lynx! You can shorten the link!</span>
            <Link to='/register' className='p-2 underline text-blue-500'>
                Register
            </Link>
            <Link to='/login' className='p-2 underline text-blue-500'>
                Login
            </Link>
            <div className='p-4'>Sending test msg to backend: {res}</div>
        </div>
    );
};

export default Home;
