import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import ROLE from '../common/role'
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    callFunc,
    onClose }
) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChageSelect = (e) => {
        setUserRole(e.target.value)
        console.log("e.target.value", e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.update_user.url, {
            method: SummaryApi.update_user.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })
        const dataResponse = await fetchResponse.json()

        if (dataResponse.success) {
            toast.success(dataResponse.message)
            onClose()
            callFunc()
        }

        console.log("response Data", dataResponse)
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-55 '>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm' >
                <button className='block ml-auto ' onClick={onClose} >
                    <IoMdCloseCircleOutline />
                </button>
                <h1 className='pb-4 text-lg font-bold'>Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <div className='flex items-center justify-between my-4 '>
                    <p>Role :</p>
                    <select className='border px-4 py-1 ' value={userRole} onChange={handleOnChageSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>
                                        {el}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>

    )
}

export default ChangeUserRole