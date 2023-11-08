import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Avatar, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { getCurrentDate } from '../../Utilities/Utilities';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';

function SingleFoodDetailsPage() {
    const { user } = useContext(AuthenticationContext);
    console.log(user);
    const location = useLocation();
    const instance = useAxiosSecure();
    const [food, setFood] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [note, setNote] = useState('');
    const [donation, setDonation] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        console.log(donation, note);
    }

    useEffect(() => {
        instance.get(location.pathname).then((response) => {
            console.log(response.data);
            setFood(response.data);
        });
    }, []);

    const handleRequest = () => {
        console.log("Handle request");
    }

    return (
        <div>
            {
                food ?
                    <div className="card w-full lg:w-1/2 bg-base-100 shadow-2xl lg:pt-5 lg:pb-5 lg:pl-2 lg:pr-2 lg:mt-5 lg:mb-5">
                        <figure>
                            <img src={food.food_image} alt={food.food_name} className='w-full' />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Name: {food.food_name}</h2>
                            <h2 className="card-title">Quantity: {food.food_quantity}</h2>
                            <h2 className="card-title">Donar name: {food.donator_name}</h2>
                            <h2 className="card-title">Pickup location: {food.pickup_location}</h2>
                            <h2 className="card-title">Expire Date: {food.expiry_date}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>Request this Food</button>

                                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                    <Modal.Header />
                                    <Modal.Body>
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
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
                                                <TextInput id="id" value={food.food_id} readOnly />
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
                                                <TextInput id="expire" value={food.expiry_date} readOnly />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="user" value="Request user" />
                                                </div>
                                                <TextInput id="user" value={user?.email} readOnly />
                                            </div>
                                            <div>
                                                <div className="mb-2 block">
                                                    <Label htmlFor="current" value="Current date" />
                                                </div>
                                                <TextInput id="current" value={getCurrentDate()} readOnly />
                                            </div>

                                            <div className="mb-2 block">
                                                <Label htmlFor="note" value="Additional note" />
                                            </div>
                                            <TextInput id="note" type="text" required onChange={(event) => { setNote(event.target.value) }} />
                                            <div className="mb-2 block">
                                                <Label htmlFor="money" value="Donation Money" />
                                            </div>
                                            <TextInput id="money" type="text" required onChange={(event) => { setDonation(event.target.value) }} />


                                            <div className="w-full">
                                                <Button pill><span>Request</span></Button>
                                            </div>

                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    : <ThreeCircleLoading circleSize={'15em'}></ThreeCircleLoading>
            }

        </div>
    )
}

export default SingleFoodDetailsPage