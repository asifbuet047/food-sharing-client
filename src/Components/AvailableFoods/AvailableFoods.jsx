import React, { useRef, useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import AvailableFoodsContainer from './AvailableFoodsContainer/AvailableFoodsContainer';
import { Button, Pagination } from 'flowbite-react';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { FaSearch } from 'react-icons/fa';

function AvailableFoods() {
    const instance = useAxios();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const searchField = useRef(null);
    const [search, setSearch] = useState(null);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const { isPending, error, data, isFetching, isSuccess } = useQuery({
        queryKey: ['available_foods', currentPage],
        queryFn: async () => {
            const res = await instance.get(`/availablefoods?page=${currentPage}&limit=10`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });


    const handleSearch = async () => {
        const searchValue = searchField.current.value;
        const res = await instance.get(`/seachfood?name=${searchValue}`);
        console.log(res.data);
        setSearch(res.data);
    };

    const handleSorting = () => {
        console.log("Sort");
    };


    return (

        <div>
            {
                search ?
                    <div>
                        <div className='flex flex-row justify-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>Search result</h1>
                        </div>
                        <div className='flex flex-row justify-evenly'>
                            <input ref={searchField} type="text" placeholder="Search by Food name" className="input input-bordered input-primary w-full max-w-xs" />
                            <FaSearch size='3em' onClick={handleSearch}></FaSearch>
                            <Button pill onClick={handleSorting}><span>Sort by Expire Date</span></Button>
                        </div>
                        <div>
                            <AvailableFoodsContainer data={search}></AvailableFoodsContainer>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='flex flex-row justify-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>All Available Foods</h1>
                        </div>
                        <div className='flex flex-row justify-evenly'>
                            <input ref={searchField} type="text" placeholder="Search by Food name" className="input input-bordered input-primary w-full max-w-xs" />
                            <FaSearch size='3em' onClick={handleSearch}></FaSearch>
                            <Button pill onClick={handleSorting}><span>Sort by Expire Date</span></Button>
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
            }
        </div>
    )
}

export default AvailableFoods