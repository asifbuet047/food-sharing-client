import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

function SingleFoodDetailsPage() {
    const location = useLocation();
    const instance = useAxiosSecure();
    const [food, setFood] = useState(null);

    useEffect(() => {
        instance.get(location.pathname).then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <div>
            

        </div>
    )
}

export default SingleFoodDetailsPage