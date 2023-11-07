import React from 'react'
import AvailableFoodsCard from './AvailableFoodsCard/AvailableFoodsCard'

function AvailableFoodsContainer({ data }) {
  if (Array.isArray(data)) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5'>
        {
          data.map((food, index) => <AvailableFoodsCard data={food} key={index}></AvailableFoodsCard>)
        }
      </div>
    )
  }
}

export default AvailableFoodsContainer