import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role === ROLE.GENERAL) {
            navigate("/")
        }
    }, [user])
    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col mt-24 '>
                    <div className='text-6xl cursor-pointer relative flex justify-center ' >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <FaUserCircle />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold mt-2'>{user?.name}</p>
                    <p className='text-sm mt-2'>{user?.role}</p>

                    {/*navigation */}
                    <div >
                        <nav className='grid p-4 '>
                            {
                                user?.role === ROLE.ADMIN && <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100' > All Users </Link>
                            }
                            {
                                user?.role === ROLE.ADMIN && <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-100' > All Orders </Link>

                            }
                            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100' > Upload Product </Link>

                        </nav>
                    </div>
                </div>
            </aside>

            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel