import { Button } from 'flowbite-react';
import useAxios from '../../Hooks/useAxios'
import ThreeCircleLoading from "../Loading/BeatLoading";
import FeaturedFoodContainer from "./FeaturedFoodContainer/FeaturedFoodContainer";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';


function Home() {
  const instance = useAxios();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   instance.get('/featuredfoods').then((response) => {
  //     console.log(response);
  //     setFeaturedFoods(response.data);
  //   }).catch((error) => {
  //     console.log(error);
  //   }).finally(() => {
  //     console.log("Finally");
  //   })
  // }, []);


  const { isPending, error, data, isFetching, isSuccess } = useQuery({
    queryKey: ['featured_foods'],
    queryFn: async () => {
      const res = await instance.get('/featuredfoods');
      return res.data;
    },
  });


  return (
    <div>
      <div className='flex flex-row justify-center'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>Featured Foods</h1>
      </div>
      <div className='border-2 rounded-lg border-green-600 mt-5 mb-5'>
        {
          isSuccess ?
            <FeaturedFoodContainer data={data}></FeaturedFoodContainer>
            : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
        }
      </div>
      <div className='flex flex-row justify-center items-center mt-5 mb-5'>
        {
          isSuccess ?
            <NavLink to={'/availablefoods'}><Button color='success' pill size='xl'>Show All</Button></NavLink>
            :
            <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
        }
      </div>

    </div>
  )
}

export default Home