import { Avatar, Button } from 'flowbite-react';
import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../../../../Utilities/Utilities';

function AvailableFoodsCard({ data }) {
    const navigate = useNavigate();
    const { food_image, food_name, donator_name, donator_image, food_quantity, pickup_location, expiry_date, _id } = data;


    const handleFoodDetails = () => {
        console.log(_id);
        navigate(`/food/${_id}`);
    };

    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
            <img src={food_image} alt={food_name} className='h-1/2 max-w-full rounded-md md:rounded-lg lg:rounded-xl' />

            <div className="card-body">
                <h2 className="text-green-500 font-bold text-xl md:text-2xl">{food_name}</h2>
                <h2 className='text-black font-semibold text-base md:text-lg'>Quantity: {food_quantity}</h2>
                <h2 className='text-black font-semibold text-base md:text-lg'>Pickup location: {pickup_location}</h2>
                <h2 className='text-black font-semibold text-base md:text-lg'>Expire Date: {convertDate(parseInt(expiry_date))}</h2>
                <Avatar img={donator_image} size={'md'} className='w-fit' rounded></Avatar>
                <h2 className='text-black font-semibold text-base md:text-lg'>Donar name: {donator_name}</h2>
                <div className="card-actions justify-center">
                    <Button onClick={handleFoodDetails}>View Details<HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
                </div>
            </div>
        </div>
    )
}

export default AvailableFoodsCard