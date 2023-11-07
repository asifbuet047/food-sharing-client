import { Avatar, Button } from 'flowbite-react';
import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi';

function FeaturedFoodCard({ data }) {
    const { food_image, food_name, donator_name, donator_image, food_quantity, pickup_location } = data;
    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
            <figure>
                <img src={food_image} alt={food_name} className='h-auto max-w-full max-h-48'/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{food_name}</h2>
                <h2 className="card-title">{food_quantity}</h2>
                <h2 className="card-title">{pickup_location}</h2>
                <Avatar img={donator_image} rounded></Avatar>
                <h2 className="card-title">{donator_name}</h2>
                <div className="card-actions justify-end">
                    <Button>View Details<HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
                </div>
            </div>
        </div>
    )
}

export default FeaturedFoodCard