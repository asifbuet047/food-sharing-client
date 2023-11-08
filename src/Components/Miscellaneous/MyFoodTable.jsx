import { useTable } from 'react-table';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ThreeCircleLoading from '../Loading/BeatLoading';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';


function MyFoodTable() {

    const { user } = useContext(AuthenticationContext);
    const [foods, setFoods] = useState(null);
    const instance = useAxiosSecure();
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    let rowItem = 0;
    let colItem = 0;

    useEffect(() => {
        instance.get(`/myfoods/${user?.email}`).then((response) => {
            setFoods(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [foods]);

    const handleClick = (row, col) => {
        if (col == 5) {
            setDeleteModal(true);
        }
        if (col == 6) {
            setUpdateModal(true);
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
            const { food_id, food_name, food_quantity, expiry_date, food_status } = food;
            const data = { food_id, food_name, food_quantity, expiry_date, food_status, delete: `Delete`, update: `Update` };
            return data;
        });
    }
    const columns = useMemo(
        () => [
            {
                Header: 'Food id',
                accessor: 'food_id',
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
                accessor: 'food_status',
            },
            {
                Header: 'Delete',
                accessor: 'delete',
            },
            {
                Header: 'Update',
                accessor: 'update',
            }
        ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div>
            <h1>Your added Foods</h1>
            {
                foods ?
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} >
                            {
                                rows.map((row, rowIndex) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className='border-2 border-green-500'>
                                            {
                                                row.cells.map((cell, colIndex) => {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            <span className='text-black font-bold text-center' onClick={() => { handleClick(rowIndex, colIndex) }}>{cell.render('Cell')}</span>
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
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
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
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
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
                    : <ThreeCircleLoading circleSize={'15em'}></ThreeCircleLoading>
            }
        </div>
    );
}

export default MyFoodTable