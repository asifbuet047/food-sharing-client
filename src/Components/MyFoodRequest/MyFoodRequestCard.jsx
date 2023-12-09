import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { convertDate } from '../../Utilities/Utilities';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import NoFoodPage from '../Miscellaneous/NoFoodPage';

function MyFoodRequestCard({ data }) {
    const { user, signOutUser } = useContext(AuthenticationContext);
    const [food, setFood] = useState(null);
    const [noFood, setNoFood] = useState(false);
    const instance = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        instance.get(`/food/${data.food_id}`).then((response) => {
            if (!response.data) {
                setNoFood(true);
                instance.delete(`/deleterequest/${data._id}`).then((response) => {
                    if (response.data) {
                        toast.success(`One of Your Request Food is deleted by its Donator. We remove it from Your chart`, {
                            position: 'bottom-center',
                            autoClose: 5000,
                        });
                    }
                }).catch((error) => { });

            } else {
                setFood(response.data);
            }
        }).catch((error) => {
            toast.error(`Something wrong ${error}`, {
                position: 'bottom-center',
                autoClose: 2000,
            });
        });
    }, []);

    const handleCancelRequest = () => {
        instance.delete(`/deleterequest/${data._id}`).then((response) => {
            instance.post(`/foodStatusUpdate/${data._id}`, {
                food_status: true
            }).then((response) => {
                if (response.data.modifiedCount) {
                    toast.success(`Successfully Removed from request`, {
                        position: 'bottom-center',
                        autoClose: 5000,
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
        <div className="card card-compact w-auto bg-base-100 shadow-xl">

            {
                food ?
                    <div className="card-body">
                        <h2 className="card-title">{data.requested_user_name}</h2>
                        <h2>Donar Name: {food.donator_name}</h2>
                        <h2>Pickup Location: {food.pickup_location}</h2>
                        <h2>Expire Date: {convertDate(food.expiry_date)}</h2>
                        <h2>Request Date: {convertDate(data?.request_date)}</h2>
                        <h2>Donation Amount: {data?.donation}</h2>
                        <h2>Status: {food?.food_status ? 'Available' : 'Delivered'}</h2>
                        <Button onClick={handleCancelRequest}>Cancel Request</Button>
                    </div>
                    : <NoFoodPage></NoFoodPage>
            }
        </div>
    )
}

export default MyFoodRequestCard