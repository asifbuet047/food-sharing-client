import { useTable } from 'react-table';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Button, Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import NoFoodPage from '../Miscellaneous/NoFoodPage';
import HorizontalBarLoading from '../Loading/HorizontalBarLoading';


function ManageMyFoodPage() {

    const { user } = useContext(AuthenticationContext);
    const [foods, setFoods] = useState([]);
    const instance = useAxiosSecure();
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [fetching, setFetching] = useState(true);
    let rowItem = 0;
    let colItem = 0;

    useEffect(() => {
        instance.get(`/myfoods/${user?.email}`).then((response) => {
            setFetching(false);
            setFoods(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleClick = (row, col) => {
        rowItem = row;
        colItem = col;
        if (col == 5) {
            setDeleteModal(true);
        }
        if (col == 6) {
            setUpdateModal(true);
        }
        if (col == 7) {
            navigate(`/manage/`);
        }
    };

    const handleDeleteFood = () => {
        setDeleteModal(false);
        const id = data[rowItem]['food_id'];
        instance.post('/deletefood', {
            food_id: id
        }).then((response) => {
            console.log(response);
            if (response.data.acknowledged) {
                setFoods(null);
                toast.success(`Successfully Deleted`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleUpdateFood = () => {
        setUpdateModal(false);
    };


    let data = [];
    if (foods) {
        data = foods.map((food, index) => {
            let { _id, food_name, food_quantity, expiry_date, food_status } = food;
            let status;
            if (food_status) {
                status = 'Available';
            } else {
                status = "Delivered";
            }
            const data = { _id, food_name, food_quantity, expiry_date, status, delete: `Delete`, update: `Update`, manage: `Manage` };
            return data;
        });
    }
    const columns = useMemo(
        () => [
            {
                Header: 'Food id',
                accessor: '_id',
            },
            {
                Header: 'Food name',
                accessor: 'food_name',
            },
            {
                Header: 'Expiry Date',
                accessor: 'expiry_date',
            },
            {
                Header: 'Quantity',
                accessor: 'food_quantity',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Delete?',
                accessor: 'delete',
            },
            {
                Header: 'Update?',
                accessor: 'update',
            },
            {
                Header: 'Manage?',
                accessor: 'manage',
            }
        ], []);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className='w-full'>
            <div className='flex flex-row justify-center'>
                {
                    foods.length > 0 ?
                        <h1 className='text-black text-xl md:text-2xl font-bold'>Your Added Foods</h1>
                        : <h1 className='text-black text-xl md:text-2xl font-bold'>Your Added Foods is Empty</h1>
                }
            </div>
            <div>
                {
                    fetching ?
                        <HorizontalBarLoading length={200}></HorizontalBarLoading>
                        :
                        <div>
                            {
                                foods.length > 0 ?
                                    <table {...getTableProps()} className='w-full'>
                                        <thead>
                                            {
                                                headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column) => (
                                                            <th {...column.getHeaderProps()}><span className='text-xs md:text-base lg:text-lg'>{column.render('Header')}</span></th>
                                                        ))}
                                                    </tr>
                                                ))
                                            }
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                            {
                                                rows.map((row, rowIndex) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()} className='border-2 border-green-500'>
                                                            {
                                                                row.cells.map((cell, colIndex) => {
                                                                    return (
                                                                        <td {...cell.getCellProps()}>
                                                                            {
                                                                                colIndex == 5 || colIndex == 6 || colIndex == 7 ?
                                                                                    <Button onClick={() => { handleClick(rowIndex, colIndex) }}>{cell.render('Cell')}</Button>
                                                                                    :
                                                                                    <span>
                                                                                        {
                                                                                            colIndex == 4 ?
                                                                                                <span className='text-black font-bold text-center text-xs md:text-base lg:text-lg' onClick={() => { handleClick(rowIndex, colIndex) }}>{cell.render('Cell')}</span>
                                                                                                : <span className='text-black font-bold text-center text-xs md:text-base lg:text-lg' onClick={() => { handleClick(rowIndex, colIndex) }}>{cell.render('Cell')}</span>
                                                                                        }
                                                                                    </span>

                                                                            }
                                                                        </td>
                                                                    );
                                                                })
                                                            }
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                        <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <Player autoplay loop src={'/assets/bin.json'} style={{ height: '200px', width: '200px' }}></Player>
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Are you sure you want to delete this food?
                                                    </h3>
                                                    <div className="flex justify-center gap-4">
                                                        <Button color="failure" onClick={handleDeleteFood}>
                                                            {"Yes, I'm sure"}
                                                        </Button>
                                                        <Button color="gray" onClick={() => setDeleteModal(false)}>
                                                            No, cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={updateModal} size="md" onClose={() => setUpdateModal(false)} popup>
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <Player autoplay loop src={'/assets/update.json'} style={{ height: '200px', width: '200px' }}></Player>
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Are you sure you want to update this food?
                                                    </h3>
                                                    <div className="flex justify-center gap-4">
                                                        <Button color="failure" onClick={handleUpdateFood}>
                                                            Yes
                                                        </Button>
                                                        <Button color="gray" onClick={() => setUpdateModal(false)}>
                                                            No
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </table>
                                    : <NoFoodPage></NoFoodPage>
                            }
                        </div>

                }
            </div>

        </div>
    );
}

export default ManageMyFoodPage