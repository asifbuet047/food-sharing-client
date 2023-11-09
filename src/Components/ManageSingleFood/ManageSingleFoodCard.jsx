import React, { useContext, useEffect, useState } from 'react'
import { convertDate } from '../../Utilities/Utilities'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';

function ManageSingleFoodCard({ data }) {
    const [value, setValue] = useState(true);
    const instance = useAxiosSecure();
    const navigate = useNavigate();
    const { signOutUser } = useContext(AuthenticationContext);


    const handleStatusUpdate = () => {
        instance.post(`/foodStatusUpdate/${data.food_id}`, {
            food_status: value
        }).then((response) => {
            if (response.data.modifiedCount) {
                toast.success(`Successfully Delivered`, {
                    position: 'bottom-center',
                    autoClose: 5000,
                });
                navigate('/managefoods');
            }
        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                signOutUser();
                toast.error(`Invalidate User Please sign in again`, {
                    position: 'bottom-right',
                    autoClose: 2000,
                });
                navigate('/signin');
            }
        });
    }

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
                <RadioGroup onChange={setValue} value={value}>
                    <Stack direction='row'>
                        <Radio value='true'>Available</Radio>
                        <Radio value='false'>Delivered</Radio>
                    </Stack>
                </RadioGroup>
                <Button onClick={handleStatusUpdate}>Submit Food Status</Button>

            </div>
        </div>
    )
}

export default ManageSingleFoodCard