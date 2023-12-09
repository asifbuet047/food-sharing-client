import React, { useRef, useState } from 'react'
import { useContext } from 'react';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { convertDateToEpoch } from '../../Utilities/Utilities';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AddFoodPage() {
    const { user, signOutUser } = useContext(AuthenticationContext);
    const instance = useAxiosSecure();
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();


    const handleAddFood = (event) => {
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

        const newFood = {
            food_name: name,
            food_image: image,
            donator_name: donatorName,
            donator_image: donatorImage,
            donator_email: donatorMail,
            food_quantity: quantity,
            pickup_location: location,
            expiry_date: convertDateToEpoch(expire),
            food_status: true
        };
        console.log(newFood);
        instance.post('addfood', newFood).then((response) => {
            if (response.data.acknowledged) {
                setUpdate(false);
                toast.success(`Successfully Add ${name} Food`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                });
                navigate('/');
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
            <Helmet>
                <title>Community Food Sharing|Add Food</title>
            </Helmet>
            {
                user ?
                    <div>
                        <div className='m-4'>
                            <h1 className='text-xl lg:text-2xl xl:text-4xl font-bold text-black text-center'>Add New Food</h1>
                        </div>
                        <form className='flex flex-col justify-center items-center w-full h-full mt-2 mb-5' onSubmit={handleAddFood}>
                            <Avatar img={user.photoURL} rounded size={'lg'} className='p-5'></Avatar>

                            <input name='name' type="text" placeholder="Name of the new food item" className="input input-bordered w-full max-w-xs m-2" />
                            <input name='image' type="text" placeholder="New food image link" className="input input-bordered w-full max-w-xs m-2" />
                            <input name='quantity' type="number" placeholder="New food quantity (How many person can normally can eat)" className="input input-bordered w-full max-w-xs m-2" />
                            <input name='location' type="text" placeholder="Pickup location (Like Dhanmondi, Gulshan etc" className="input input-bordered w-full max-w-xs m-2" />
                            <input name='expire' type="text" placeholder="Expire date (dd/mm/yyyy)" className="input input-bordered w-full max-w-xs m-2" />
                            {
                                user.displayName ?
                                    <input name='donatorName' type="text" value={user?.displayName} className="input input-bordered w-full max-w-xs m-2" />
                                    : <input name='donatorName' type="text" placeholder='Your name' className="input input-bordered w-full max-w-xs m-2" />
                            }
                            {
                                user.photoURL ?
                                    <input name='donatorImage' type="text" value={user?.photoURL} className="input input-bordered w-full max-w-xs m-2" />
                                    : <input name='donatorImage' type="text" placeholder='Your profile picture URL' className="input input-bordered w-full max-w-xs m-2" />
                            }
                            {
                                user.email ?
                                    <input name='donatorMail' type="text" value={user?.email} className="input input-bordered w-full max-w-xs m-2" />
                                    : <input name='donatorMail' type="text" placeholder={user?.email} className="input input-bordered w-full max-w-xs m-2" />
                            }

                            <input name='status' type="text" value="Available" className="input input-bordered w-full max-w-xs m-2" />

                            {
                                update ? <Button size='xl' outline type='submit' isProcessing>Adding Food</Button>
                                    : <Button size='xl' outline type='submit'> Add Food</Button>
                            }

                        </form>
                    </div>
                    : <ThreeCircleLoading circleSize={'10em'}></ThreeCircleLoading>
            }

        </div >
    )
}

export default AddFoodPage