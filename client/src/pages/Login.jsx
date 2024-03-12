import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            } else {
                // setUser(data);
                // if (!user) {
                //     console.log('INSIDE !user');
                //     await axios.get('/profile').then(({ data }) => {
                //         setUser(data);
                //     });
                // }
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
        // axios.get('/');
    };

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <form
                action=''
                onSubmit={loginUser}
                className='flex flex-col max-sm:w-10/12 md:w-1/3 gap-2 [&_input]:border [&_input]:rounded [&_input]:p-1'
            >
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
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                    placeholder='Enter Password...'
                />
                <button
                    type='submit'
                    className='bg-blue-400 text-white p-1 rounded-md mt-2'
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
};

export default Login;
