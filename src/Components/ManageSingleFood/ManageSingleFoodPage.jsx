import React, { useEffect, useState } from 'react'
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Label, Modal, TextInput } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import ManageSingleFoodCard from './ManageSingleFoodCard';
import NoFoodPage from '../Miscellaneous/NoFoodPage';

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
            {
                requestFoods ?
                    <div className='w-full flex flex-col justify-center items-center'>
                        {
                            requestFoods.length > 0 ?
                                requestFoods.map((food, index) => <ManageSingleFoodCard data={food} key={index}></ManageSingleFoodCard>)
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