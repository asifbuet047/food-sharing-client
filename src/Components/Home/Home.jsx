import { Button, Carousel } from 'flowbite-react';
import useAxios from '../../Hooks/useAxios'
import ThreeCircleLoading from "../Loading/BeatLoading";
import HorizontalBarLoading from '../Loading/HorizontalBarLoading';
import FeaturedFoodContainer from "./FeaturedFoodContainer/FeaturedFoodContainer";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NoFoodPage from '../Miscellaneous/NoFoodPage';
import { Helmet } from 'react-helmet';
import { FadeLoader } from 'react-spinners';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { Image } from '@chakra-ui/react';


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
      <Helmet>
        <title>Community Food Sharing|Home</title>
      </Helmet>
      <div className='flex flex-row justify-center'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>Featured Foods</h1>
      </div>
      <div className='h-56 sm:h-64 xl:h-80 2xl:h-96'>
        <Carousel leftControl={<AiOutlineArrowLeft />} rightControl={<AiOutlineArrowRight />} slideInterval={1000}>
          <Image src='https://i.ibb.co/Gk9NyZ9/Gk9NyZ9.jpg' crossOrigin='anonymous' fit={'fill'}></Image>
          <Image src='https://i.ibb.co/P4rZzbX/P4rZzbX.jpg' crossOrigin='anonymous' fit={'fill'}></Image>
          <Image src='https://i.ibb.co/zRbRH2x/zRbRH2x.jpg' crossOrigin='anonymous' fit={'fill'}></Image>
        </Carousel>
      </div>
      <div className='border-4 rounded-lg border-green-600 mt-5 mb-5 p-5'>
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