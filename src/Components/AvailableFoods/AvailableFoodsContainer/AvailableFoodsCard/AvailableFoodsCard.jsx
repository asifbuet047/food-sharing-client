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
            <figure>
                <img src={food_image} alt={food_name} className='h-auto max-w-full max-h-48' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{food_name}</h2>
                <h2>Quantity: {food_quantity}</h2>
                <h2>Pickup location: {pickup_location}</h2>
                <h2>Expire Date: {convertDate(parseInt(expiry_date))}</h2>
                <Avatar img={donator_image} rounded></Avatar>
                <h2 className="card-title">{donator_name}</h2>
                <div className="card-actions justify-center">
                    <Button onClick={handleFoodDetails}>View Details<HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
                </div>
            </div>
        </div>
    )
}

export default AvailableFoodsCard