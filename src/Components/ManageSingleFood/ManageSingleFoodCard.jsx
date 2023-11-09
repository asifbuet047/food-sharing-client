import React from 'react'
import { convertDate } from '../../Utilities/Utilities'

function ManageSingleFoodCard({ data }) {
    console.log(data);
    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
            <figure>
                <img src={data.requested_user_photo} alt={data.requested_user_photo} className='h-auto max-w-full max-h-48' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{data.requested_user_name}</h2>
                <h2>Requester mail: {data.requested_user_email}</h2>
                <h2>Request Date: {convertDate(data.request_date)}</h2>
                <h2>Additional note: {data.note}</h2>
            </div>
        </div>
    )
}

export default ManageSingleFoodCard