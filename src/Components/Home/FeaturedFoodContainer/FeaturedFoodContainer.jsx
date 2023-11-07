import React from 'react'
import FeaturedFoodCard from './FeaturedFoodCard/FeaturedFoodCard'

function FeaturedFoodContainer({ data }) {
    console.log(data);
    if (Array.isArray(data)) {
        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-10 lg:gap-15'>
                {
                    data.map((food, index) => <FeaturedFoodCard data={food} key={index}></FeaturedFoodCard>)
                }
            </div>
        )
    }
}

export default FeaturedFoodContainer