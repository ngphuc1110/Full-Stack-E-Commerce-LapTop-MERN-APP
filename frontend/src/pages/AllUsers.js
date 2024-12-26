import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';



const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        address: "",
        role: "",
        _id: "",

    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.all_users.url, {
            method: SummaryApi.all_users.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

        console.log("dataResponse", dataResponse)
    }


    useEffect(() => {
        fetchAllUsers()
    }, [])
    return (
        <div>
            <table className='w-full userTable'>
                <thead >
                    <tr className='bg-black text-white'>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Adress</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Edit</th>
                        {/* <th>Delete</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.address}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-200 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)
                                            }}>
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        address={updateUserDetails.address}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }

        </div>
    )
}

export default AllUsers