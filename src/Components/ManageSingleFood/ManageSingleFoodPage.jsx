import React, { useEffect, useState } from 'react'
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Label, Modal, TextInput } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import ManageSingleFoodCard from './ManageSingleFoodCard';
import NoFoodPage from '../Miscellaneous/NoFoodPage';
import { Helmet } from 'react-helmet';

function ManageSingleFoodPage() {
    const [requestFoods, setRequestFoods] = useState(null);
    const location = useLocation();
    const instance = useAxiosSecure();

    useEffect(() => {
        console.log(location.pathname);
        instance.get(location.pathname).then((response) => {
            setRequestFoods(response.data);
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                signOutUser();
                toast.error(`Invalidate User Please sign in again`, {
                    position: 'bottom-right',
                    autoClose: 2000,
                });
                navigate('/signin');
            }
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Community Food Sharing|Manage Single Food</title>
            </Helmet>
            {
                requestFoods ?
                    <div>
                        {
                            requestFoods.length > 0 ?
                                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5'>
                                    {
                                        requestFoods.map((food, index) => <ManageSingleFoodCard data={food} key={index}></ManageSingleFoodCard>)
                                    }
                                </div>
                                :
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>No One request this food yet</h1>
                                    <NoFoodPage></NoFoodPage>
                                </div>
                        }
                    </div>
                    : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
            }

        </div>
    )
}

export default ManageSingleFoodPage