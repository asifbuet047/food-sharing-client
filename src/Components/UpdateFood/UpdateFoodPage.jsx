import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { convertDate } from '../../Utilities/Utilities';
import { toast } from 'react-toastify';

function UpdateFoodPage() {
    const { user } = useContext(AuthenticationContext);
    const [food, setFood] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const instance = useAxiosSecure();
    const id = location.pathname.slice(12);

    useEffect(() => {
        instance.get(`/food/${id}`).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleFoodUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const image = formData.get('image');
        const quantity = formData.get('quantity');
        const location = formData.get('location');
        const expire = formData.get('expire');
        const donatorName = formData.get('donatorName');
        const donatorMail = formData.get('donatorMail');
        const donatorImage = formData.get('donatorImage');
        let status;

        if (formData.get('status') === 'Available') {
            status = true;
        } else {
            status = false;
        }

        const updateFood = {
            food_name: name,
            food_image: image,
            donator_name: donatorName,
            donator_image: donatorImage,
            donator_email: donatorMail,
            food_quantity: quantity,
            pickup_location: location,
            expiry_date: convertDateToEpoch(expire),
            food_status: status
        };
        console.log(updateFood);
        instance.patch(`/updatefood/${id}`, updateFood).then((response) => {
            if (response.data.acknowledged) {
                setFood(response.data);
                toast.success(`Successfully Add ${name} Food`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                });
            }
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
    }

    return (
        <div>
            {
                user ?
                    <div>
                        {
                            food ?
                                <div>
                                    <div className='m-4'>
                                        <h1 className='text-xl lg:text-2xl xl:text-4xl font-bold text-black text-center'>Update ${food.food_name}</h1>
                                    </div>
                                    <form className='flex flex-col justify-center items-center w-full h-full mt-2 mb-5' onSubmit={handleFoodUpdate}>
                                        <Avatar img={user.photoURL} rounded size={'lg'} className='p-5'></Avatar>
                                        <input name='name' type="text" placeholder={food.food_name} className="input input-bordered w-full max-w-xs m-2" />
                                        <input name='image' type="text" placeholder={food.food_image} className="input input-bordered w-full max-w-xs m-2" />
                                        <input name='quantity' type="number" placeholder={food.food_quantity} className="input input-bordered w-full max-w-xs m-2" />
                                        <input name='location' type="text" placeholder={food.pickup_location} className="input input-bordered w-full max-w-xs m-2" />
                                        <input name='expire' type="text" placeholder={convertDate(food.expiry_date)} className="input input-bordered w-full max-w-xs m-2" />
                                        {
                                            user.displayName ?
                                                <input name='donatorName' type="text" value={user?.displayName} className="input input-bordered w-full max-w-xs m-2" />
                                                : <input name='donatorName' type="text" placeholder={food.donator_name} className="input input-bordered w-full max-w-xs m-2" />
                                        }
                                        {
                                            user.photoURL ?
                                                <input name='donatorImage' type="text" value={user?.photoURL} className="input input-bordered w-full max-w-xs m-2" />
                                                : <input name='donatorImage' type="text" placeholder={food.donator_image} className="input input-bordered w-full max-w-xs m-2" />
                                        }
                                        {
                                            user.email ?
                                                <input name='donatorMail' type="text" value={user?.email} className="input input-bordered w-full max-w-xs m-2" />
                                                : <input name='donatorMail' type="text" placeholder={user?.email} className="input input-bordered w-full max-w-xs m-2" />
                                        }

                                        <input name='status' type="text" placeholder="Available|Delivered" className="input input-bordered w-full max-w-xs m-2" />

                                        {
                                            update ? <Button size='xl' outline type='submit' isProcessing>Adding Food</Button>
                                                : <Button size='xl' outline type='submit'> Add Food</Button>
                                        }

                                    </form>
                                </div>
                                : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
                        }
                    </div>
                    : <ThreeCircleLoading circleSize={'10em'}></ThreeCircleLoading>
            }
        </div>
    )
}

export default UpdateFoodPage