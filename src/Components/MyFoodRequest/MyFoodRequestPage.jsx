import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import { toast } from 'react-toastify';
import ThreeCircleLoading from '../Loading/BeatLoading';
import MyFoodRequestCard from './MyFoodRequestCard';
import NoFoodPage from '../Miscellaneous/NoFoodPage';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function MyFoodRequestPage() {
    const { user, signOutUser } = useContext(AuthenticationContext);
    const instance = useAxiosSecure();
    const navigate = useNavigate();
    const [foods, setFoods] = useState(null);


    useEffect(() => {
        instance.get(`/myfoodrequest?email=${user?.email}`).then((response) => {
            setFoods(response.data);
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
                <title>Community Food Sharing|My Food Request</title>
            </Helmet>
            {
                foods ?
                    <div>
                        {
                            foods.length > 0 ?
                                <div>
                                    <div className='flex flex-row justify-center'>
                                        <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>Your All Food Requests</h1>
                                    </div>
                                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5'>
                                        {
                                            foods.map((food, index) => <MyFoodRequestCard data={food} key={index}></MyFoodRequestCard>)
                                        }
                                    </div>
                                </div>
                                :
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>You dont request any food yet</h1>
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