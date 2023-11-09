import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Avatar, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { convertDate, getCurrentDate } from '../../Utilities/Utilities';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import { toast } from 'react-toastify';

function SingleFoodDetailsPage() {
    const { user, signOutUser } = useContext(AuthenticationContext);
    const location = useLocation();
    const instance = useAxiosSecure();
    const [food, setFood] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [note, setNote] = useState(null);
    const [donation, setDonation] = useState(0);
    const [username, setUsername] = useState(null);
    const [userphoto, setUserphoto] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const navigate = useNavigate();

    function onCloseModal() {
        setOpenModal(false);
        console.log(donation, note);
    }

    useEffect(() => {
        instance.get(location.pathname).then((response) => {
            setFood(response.data);
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                signOutUser();
                toast.error(`Invalidate User Please sign in again`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                });
                navigate('/signin');
            }
        });
    }, []);

    const handleRequest = () => {
        setOpenModal(false);
        console.log(username, userphoto);
        instance.get(`/requestedfood?mail=${user.email}`).then((response) => {
            const similar = response.data.find((value) => value.food_id == food._id);
            console.log(similar);
            if (!similar) {
                const data = {
                    requested_user_name: username,
                    requested_user_email: user?.email,
                    requested_user_photo: userphoto,
                    food_id: food._id,
                    request_date: Math.floor(Date.now() / 1000),
                    note: note ? note : user?.email,
                    donation: parseInt(donation)
                };
                console.log(data);
                instance.post('/requestfood', { data }).then((response) => {
                    console.log(response);
                    if (response.data.acknowledged) {
                        navigate('/');
                        toast.success(`Successfully Requested`, {
                            position: 'bottom-center',
                            autoClose: 2000,
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                toast.success('You already requested this food. No need to request again. Go to My Request Foods for details', {
                    position: 'bottom-center',
                    autoClose: 5000,
                });
            }
        }).catch((error) => {
            toast.error(`Nwtwork error`, {
                position: 'bottom-right',
                autoClose: 2000,
            });
        });
    }

    return (
        <div>
            {
                food ?
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>Food Details</h1>
                        <div className="card w-full lg:w-1/2 bg-base-100 shadow-2xl lg:pt-5 lg:pb-5 lg:pl-2 lg:pr-2 lg:mt-5 lg:mb-5">
                            <figure>
                                <img src={food.food_image} alt={food.food_name} className='w-full' />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Name: {food.food_name}</h2>
                                <h2 className="card-title">Quantity: {food.food_quantity}</h2>
                                <h2 className="card-title">Donar name: {food.donator_name}</h2>
                                <h2 className="card-title">Pickup location: {food.pickup_location}</h2>
                                <h2 className="card-title">Expire Date: {convertDate(parseInt(food.expiry_date))}</h2>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>Request this Food</button>

                                    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="space-y-6">
                                                <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">Request this Food?</h3>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="name" value="Food name" />
                                                    </div>
                                                    <TextInput id="name" value={food.food_name} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="id" value="Food id" />
                                                    </div>
                                                    <TextInput id="id" value={food._id} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="email" value="Donator mail" />
                                                    </div>
                                                    <TextInput id="email" value={food.donator_email} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="donatorName" value="Donator name" />
                                                    </div>
                                                    <TextInput id="donatorName" value={food.donator_name} readOnly />
                                                </div>
                                                <Avatar img={food.donator_image}></Avatar>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="pickup" value="Pickup location" />
                                                    </div>
                                                    <TextInput id="pickup" value={food.pickup_location} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="expire" value="Expiry date" />
                                                    </div>
                                                    <TextInput id="expire" value={getCurrentDate(parseInt(food.expiry_date))} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="user" value="Requester Mail" />
                                                    </div>
                                                    <TextInput id="usermail" value={user.email} readOnly />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="user" value="Requester Name" />
                                                    </div>
                                                    <TextInput id="username" placeholder={user.displayName ? user.displayName : user.email} onChange={(event) => { setUsername(event.target.value) }} />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="user" value="Requester Profile Picture Link" />
                                                    </div>
                                                    <TextInput id="userphoto" placeholder={user.photoURL ? user.photoURL : `https://i.ibb.co/H7ZyRMf/avatar.png`} onChange={(event) => { setUserphoto(event.target.value) }} />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="current" value="Current date" />
                                                    </div>
                                                    <TextInput id="current" value={getCurrentDate()} onChange={(event) => { setCurrentDate(event.target.value) }} readOnly />
                                                </div>

                                                <div className="mb-2 block">
                                                    <Label htmlFor="note" value="Additional note" />
                                                </div>
                                                <TextInput id="note" type="text" required placeholder='Write some note' onChange={(event) => { setNote(event.target.value) }} />
                                                <div className="mb-2 block">
                                                    <Label htmlFor="money" value="Donation Money" />
                                                </div>
                                                <TextInput id="money" type="number" required placeholder='Donate any amount' onChange={(event) => { setDonation(event.target.value) }} />

                                                <div className="w-full">
                                                    <Button pill onClick={handleRequest}><span>Request</span></Button>
                                                </div>

                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
            }

        </div>
    )
}

export default SingleFoodDetailsPage