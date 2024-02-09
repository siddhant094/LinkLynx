import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post('/register', {
                name,
                email,
                password,
            });
            if (data.error) toast.error(data.error);
            else {
                setData({});
                toast.success('Login Successful welcome');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <form
                action=''
                onSubmit={registerUser}
                className='flex flex-col max-sm:w-10/12 md:w-1/3 gap-2 [&_input]:rounded [&_input]:border [&_input]:p-1'
            >
                <label htmlFor=''>Name</label>
                <input
                    type='text'
                    placeholder='Enter Name...'
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                />
                <label htmlFor=''>Email</label>
                <input
                    type='email'
                    placeholder='Enter Email...'
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                />
                <label htmlFor=''>Password</label>
                <input
                    type='password'
                    placeholder='Enter Password...'
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                />
                <button
                    type='submit'
                    className='bg-blue-400 text-white p-1 rounded-md mt-2'
                >
                    REGISTER
                </button>
            </form>
        </div>
    );
};

export default Register;
