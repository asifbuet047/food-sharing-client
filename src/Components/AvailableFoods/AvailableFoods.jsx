import React, { useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import AvailableFoodsContainer from './AvailableFoodsContainer/AvailableFoodsContainer';
import { Pagination } from 'flowbite-react';
import ThreeCircleLoading from '../Loading/BeatLoading'

function AvailableFoods() {
    const instance = useAxios();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const { isPending, error, data, isFetching, isSuccess } = useQuery({
        queryKey: ['available_foods', currentPage],
        queryFn: async () => {
            const res = await instance.get(`/availablefoods?page=${currentPage}&limit=10`);
            console.log(res.data);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });


    return (
        <div>
            <div className='flex flex-row justify-center'>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>All Available Foods</h1>
            </div>
            <div className='border-2 rounded-lg border-green-600 mt-5 mb-5'>
                {
                    isSuccess ?
                        <AvailableFoodsContainer data={data.available_foods}></AvailableFoodsContainer>
                        : <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
                }
            </div>
            <div className='flex flex-row justify-center items-center mt-5 mb-5'>
                {
                    isSuccess ?
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={currentPage} totalPages={Math.ceil(data['totalCount'] / 10)} onPageChange={onPageChange} />
                        </div>
                        :
                        <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>
                }
            </div>

        </div>
    )
}

export default AvailableFoods