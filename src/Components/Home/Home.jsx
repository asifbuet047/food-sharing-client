import { Button } from 'flowbite-react';
import useAxios from '../../Hooks/useAxios'
import ThreeCircleLoading from "../Loading/BeatLoading";
import HorizontalBarLoading from '../Loading/HorizontalBarLoading';
import FeaturedFoodContainer from "./FeaturedFoodContainer/FeaturedFoodContainer";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NoFoodPage from '../Miscellaneous/NoFoodPage';


function Home() {
  const instance = useAxios();
  const queryClient = useQueryClient();


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
            <div>
              {
                data.length > 0 ?
                  <FeaturedFoodContainer data={data}></FeaturedFoodContainer>
                  : <NoFoodPage></NoFoodPage>
              }
            </div>
            : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
        }
      </div>
      <div className='flex flex-row justify-center items-center mt-5 mb-5'>
        {
          isSuccess ?
            <NavLink to={'/availablefoods'}><Button color='success' pill size='xl'>Show All</Button></NavLink>
            : <HorizontalBarLoading length={200}></HorizontalBarLoading>

        }
      </div>

    </div>
  )
}

export default Home