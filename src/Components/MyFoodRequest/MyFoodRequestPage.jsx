import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import { toast } from 'react-toastify';
import ThreeCircleLoading from '../Loading/BeatLoading';
import MyFoodRequestCard from './MyFoodRequestCard';

function MyFoodRequestPage() {
    const { user } = useContext(AuthenticationContext);
    const instance = useAxiosSecure();
    const [foods, setFoods] = useState(null);


    useEffect(() => {
        instance.get(`/myfoodrequest?email=${user?.email}`).then((response) => {
            console.log(response.data);
            setFoods(response.data);
        }).catch((error) => {
            console.log(error);
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
                foods ?
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5'>
                        {
                            foods.length > 0 ?
                                foods.map((food, index) => <MyFoodRequestCard data={food} key={index}></MyFoodRequestCard>)
                                :
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>You dont requst any food yet</h1>
                                    <NoFoodPage></NoFoodPage>
                                </div>
                        }
                    </div>
                    : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
            }
        </div>
    )
}

export default MyFoodRequestPage