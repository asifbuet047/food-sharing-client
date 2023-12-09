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
import { convertDate } from '../../Utilities/Utilities';
import { Helmet } from 'react-helmet';


function ManageMyFoodPage() {

    const { user } = useContext(AuthenticationContext);
    const [foods, setFoods] = useState(null);
    const instance = useAxiosSecure();
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [row, setRow] = useState(0);

    useEffect(() => {
        instance.get(`/myfoods/${user?.email}`).then((response) => {
            setFetching(false);
            setFoods(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleClick = (r, c) => {
        if (c == 5) {
            setRow(r);
            setDeleteModal(true);
        }
        if (c == 6) {
            setRow(r);
            setUpdateModal(true);
        }
        if (c == 7) {
            navigate(`/manage/${foods[r]._id}`);
        }
    };

    const handleDeleteFood = () => {
        setDeleteModal(false);
        const id = data[row]['_id'];
        console.log(id);
        instance.post('/deletefood', {
            food_id: id
        }).then((response) => {
            console.log(response.data);
            if (response.data.acknowledged) {
                navigate('/managefoods');
                toast.success(`Successfully Deleted`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                });
            }
        }).catch((error) => {
            navigate('/managefoods');
            toast.success(`Something wrong ${error}`, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        });
    };

    const handleUpdateFood = () => {
        setUpdateModal(false);
        navigate(`/updatefood/${data[row]['_id']}`);
    };


    let data = [];
    if (foods) {
        data = foods.map((food) => {
            let { _id, food_name, food_quantity, expiry_date, food_status } = food;
            let status;
            if (food_status) {
                status = 'Available';
            } else {
                status = "Delivered";
            }
            const date = convertDate(expiry_date);
            const d = { _id, food_name, food_quantity, date, status, delete: `Delete`, update: `Update`, manage: `Manage` };
            return d;
        });
    }


    const columns = useMemo(
        () => [
            {
                Header: 'Food No',
                accessor: '_id',
            },
            {
                Header: 'Food name',
                accessor: 'food_name',
            },
            {
                Header: 'Expiry Date',
                accessor: 'date',
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
            <Helmet>
                <title>Community Food Sharing|Manage My Foods</title>
            </Helmet>
            <div className='flex flex-row justify-center'>
                {
                    foods ?
                        <div className='flex flex-row justify-center items-center'>
                            {
                                foods.length > 0 ?
                                    <h1 className='text-black text-xl md:text-2xl font-bold text-center'>Your Added Foods</h1>
                                    :
                                    <div>
                                        <h1 className='text-black text-xl md:text-2xl font-bold text-center'>You dont Add any Foods</h1>
                                        <NoFoodPage></NoFoodPage>
                                    </div>

                            }
                        </div>
                        :
                        <h1 className='text-black text-xl md:text-2xl font-bold'>Your Added Foods is fetching</h1>
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
                                    <table {...getTableProps()} className='w-screen'>
                                        <thead className='w-full'>
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
                                        <tbody {...getTableBodyProps()} className='w-full'>
                                            {
                                                rows.map((row, rowIndex) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()} className='max-w-full border-4 border-green-500'>
                                                            {
                                                                row.cells.map((cell, colIndex) => {
                                                                    return (
                                                                        <td {...cell.getCellProps()} className='border-2 border-green-500'>
                                                                            {

                                                                                colIndex == 5 || colIndex == 6 || colIndex == 7 ?
                                                                                    <div className='flex flex-row justify-center items-center'>
                                                                                        <Button onClick={() => { handleClick(rowIndex, colIndex) }}>{cell.render('Cell')}</Button>
                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        {
                                                                                            colIndex == 0 ?
                                                                                                <div className='flex flex-row justify-center items-center'>
                                                                                                    <span className='text-black font-bold text-center text-xs md:text-base lg:text-lg w-fit'>{rowIndex + 1}</span>
                                                                                                </div>
                                                                                                :
                                                                                                <div className='flex flex-row justify-center items-center'>
                                                                                                    <span className='text-black font-bold text-center text-xs md:text-base lg:text-lg w-fit'>{cell.render('Cell')}</span>
                                                                                                </div>

                                                                                        }
                                                                                    </div>
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
                                    : <span></span>
                            }
                        </div>

                }
            </div>

        </div>
    );
}

export default ManageMyFoodPage