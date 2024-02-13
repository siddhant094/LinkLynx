import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Dashboard = () => {
    // const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [links, setLinks] = useState();
    const [changeId, setChangeId] = useState('');
    const [newLink, setNewLink] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [updaterIsOpen, setUpdaterisOpen] = useState(false);
    const [url, setUrl] = useState('');

    const handleDelete = async (shortId) => {
        try {
            await axios.delete(`/url/${shortId}`);
        } catch (error) {
            console.log(error);
            toast.error('Error while Deleting, try again.');
        }
        setIsChanged(!isChanged);
        toast.success('Redirect Deleted!');
    };

    const registerLink = async (e) => {
        e.preventDefault();
        // console.log('HERE');
        try {
            const id = await axios.post('/url', {
                url,
                userId: user.id,
            });

            if (!id) {
                toast.error('Error in id');
            } else {
                toast.success(`Created Successfully`);
                setUrl('');
                setIsChanged(!isChanged);
                // setData({});
                // navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateLink = async () => {
        // console.log('Handled');
        await axios.put(`/url/${changeId}`, {
            newLink,
        });
        setIsChanged(!isChanged);
        toast.success('Updated Successfully');
        setChangeId('');
        closeUpdaterHandler();
    };

    const handleUpdate = (shortId) => {
        // console.log({ id: _id });
        setChangeId(shortId);
        setUpdaterisOpen(true);
    };

    const closeUpdaterHandler = () => {
        setChangeId('');
        setUpdaterisOpen(false);
    };

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                console.log(user);
                const { id } = user;
                const responseData = await axios.post('/info', {
                    id,
                });
                console.log(responseData);
                setLinks(responseData.data.links);
            } catch (err) {
                console.log(err);
                toast.error('Error Occoured');
            }
        };
        fetchLinks();
    }, [isChanged, user]);

    return (
        <div className='p-3 flex flex-col gap-4 justify-center items-center'>
            {updaterIsOpen && (
                <div
                    onClick={closeUpdaterHandler}
                    className='backdrop w-screen h-screen z-10'
                ></div>
            )}
            {updaterIsOpen && (
                // <div className='flex items-center justify-center '>
                <div className='bg-white w-2/6 h-2/6 z-20 fixed rounded-xl flex flex-col p-4 gap-4 items-center justify-center'>
                    <span>ENTER NEW URL</span>
                    <input
                        type='text'
                        placeholder='Enter New URL...'
                        className='p-2 border w-full rounded'
                        onChange={(e) => {
                            setNewLink(e.target.value);
                        }}
                        value={newLink}
                    />
                    <button
                        onClick={updateLink}
                        className='bg-green-500 py-1 text-white w-full rounded'
                    >
                        UPDATE
                    </button>
                    {/* </div> */}
                </div>
            )}
            {user && (
                <h1 className='text-2xl'>
                    Hey {user.name}! Welocme to you Dashboard.
                </h1>
            )}
            <form
                onSubmit={registerLink}
                className='flex md:flex-row max-sm:flex-col items-center gap-2 [&_input]:border [&_input]:rounded [&_input]:p-1'
            >
                <label>Enter a URL to Shorten: </label>
                <input
                    type='text'
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    className='w-80'
                    placeholder='Enter URL...'
                />
                <button
                    type='submit'
                    className='bg-blue-400 text-white py-1 px-2 rounded-md'
                >
                    SUBMIT
                </button>
            </form>
            <div className='md:w-3/5 max-sm:w-11/12 bg-[#F2F2F2] gap-4 font-[Figtree] items-center justify-center py-4 rounded-lg md:px-5'>
                {links &&
                    links.map((item, index) => (
                        <div
                            className='bg-white p-3 max-sm:mx-3 mb-4 text-black gap-2 rounded-lg'
                            key={index}
                        >
                            <div className='mb-3'>
                                <span className='font-semibold'>
                                    Original URL{': '}
                                </span>
                                {/* <span>{item.redirectURL}</span> */}
                                <a
                                    href={item.redirectURL}
                                    target='_blank'
                                    className='text-blue-500 underline'
                                >
                                    {item.redirectURL}
                                </a>
                            </div>
                            <div className='mb-3'>
                                <span className='font-semibold'>
                                    Shortened URL{': '}
                                </span>
                                <a
                                    href={`${
                                        import.meta.env.VITE_APP_BACKEND_URL
                                    }/url/${item.shortId}`}
                                    target='_blank'
                                    className='text-blue-500 underline'
                                    onClick={() => {
                                        setIsChanged(!isChanged);
                                    }}
                                >{`${
                                    import.meta.env.VITE_APP_BACKEND_URL
                                }/url/${item.shortId}`}</a>
                            </div>
                            <div className='mb-3'>
                                <span className='font-semibold'>
                                    Analytics{': '}
                                </span>
                                <span>
                                    Total Visits on your URL were{' '}
                                    {item.visitHistory.length}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(item.shortId)}
                                className='text-red-600 mr-4'
                            >
                                <span class='material-symbols-outlined'>
                                    delete
                                </span>
                            </button>
                            <button
                                onClick={() => handleUpdate(item.shortId)}
                                className='text-yellow-600'
                            >
                                <span class='material-symbols-outlined'>
                                    edit
                                </span>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dashboard;
