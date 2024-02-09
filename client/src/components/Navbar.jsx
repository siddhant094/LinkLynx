import React from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from '../context/userContext';
// import { useContext } from 'react';

const Navbar = () => {
    // const { user, setUser } = useContext(UserContext);

    return (
        <nav className='flex justify-between px-3 bg-slate-100'>
            <Link to='/' className='p-2 font-semibold text-xl'>
                Link Lynx
            </Link>
            {/* {user && user.isLoggedIn ? ( */}
            <div className='flex justify-center items-center'>
                <Link to='/register' className='p-2'>
                    Register
                </Link>
                <Link to='/login' className='p-2'>
                    Login
                </Link>
            </div>
            {/* ) : (
                <div>
                    <button
                        className='p-2'
                        onClick={() => {
                            setUser({ isLoggedIn: false });
                        }}
                    >
                        Logout
                    </button>
                </div>
            )} */}
        </nav>
    );
};

export default Navbar;
