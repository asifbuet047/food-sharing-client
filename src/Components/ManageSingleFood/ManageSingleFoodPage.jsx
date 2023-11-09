import React, { useEffect, useState } from 'react'
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Label, Modal, TextInput } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

function ManageSingleFoodPage() {
    const [requestFood, setRequestFood] = useState(null);
    const instance = useAxiosSecure();

    useEffect(() => {

    }, []);

    return (
        <div>
            {
                requestFood ?
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-black font-bold text-base md:text-xl lg:text-3xl'>Manage Single Food</h1>
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

export default ManageSingleFoodPage