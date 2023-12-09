import React, { useRef, useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import AvailableFoodsContainer from './AvailableFoodsContainer/AvailableFoodsContainer';
import { Button, Pagination } from 'flowbite-react';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { FaSearch } from 'react-icons/fa';
import NoFoodPage from '../Miscellaneous/NoFoodPage'
import { Helmet } from 'react-helmet';

function AvailableFoods() {
    const instance = useAxios();
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('quantity');
    const searchField = useRef(null);
    const [search, setSearch] = useState(null);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const { isPending, error, data, isFetching, isSuccess } = useQuery({
        queryKey: ['available_foods', currentPage, sortType],
        queryFn: async () => {
            const res = await instance.get(`/availablefoods?page=${currentPage}&limit=10&sort=${sortType}`);
            return res.data;
        },
        placeholderData: keepPreviousData,
    });


    const handleSearch = async () => {
        const searchValue = searchField.current.value;
        const res = await instance.get(`/seachfood?name=${searchValue}`);
        setSearch(res.data);
    };

    const handleSorting = () => {
        setSearch(null);
        setSortType('expire');
    };


    return (

        <div>
            <Helmet>
                <title>Community Food Sharing|Available Foods</title>
            </Helmet>
            {
                search ?
                    <div>
                        <div className='flex flex-row justify-center'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-black'>Search result</h1>
                        </div>
                        <div className='flex flex-col md:flex-row justify-evenly items-center rounded-lg border-2 border-green-600'>
                            <input ref={searchField} type="text" placeholder="Search by Food name" className="input input-bordered input-primary w-full max-w-xs m-2" />
                            <FaSearch size='3em' onClick={handleSearch} className='m-2'></FaSearch>
                            <Button pill onClick={handleSorting} className='m-2'><span>Sort by Expire Date</span></Button>
                        </div>
                        {
                            search.length > 0 ?
                                <div className='rounded-lg mt-5 mb-5 '>
                                    <AvailableFoodsContainer data={search}></AvailableFoodsContainer>
                                </div>
                                : <NoFoodPage></NoFoodPage>

                        }

                    </div>
                    :
                    <div>
                        <div className='flex flex-row justify-center'>
                            <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold text-black'>All Available Foods</h1>
                        </div>
                        <div className='flex flex-col md:flex-row justify-evenly items-center rounded-lg border-2 border-green-600'>
                            <input ref={searchField} type="text" placeholder="Search by Food name" className="m-2 input input-bordered input-primary w-full max-w-xs" />
                            <FaSearch size='3em' onClick={handleSearch} className='m-2'></FaSearch>
                            <Button pill onClick={handleSorting} className='m-2'><span>Sort by Expire Date</span></Button>
                        </div>
                        <div className='rounded-lg mt-5 mb-5'>
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