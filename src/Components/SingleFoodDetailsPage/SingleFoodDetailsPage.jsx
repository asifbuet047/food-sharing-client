import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ThreeCircleLoading from '../Loading/BeatLoading';

function SingleFoodDetailsPage() {
    const location = useLocation();
    const instance = useAxiosSecure();
    const [food, setFood] = useState(null);

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
                                <button className="btn btn-secondary" onClick={handleRequest}>Request this Food</button>
                            </div>
                        </div>
                    </div>
                    : <ThreeCircleLoading circleSize={'25em'}></ThreeCircleLoading>
            }

        </div>
    )
}

export default SingleFoodDetailsPage