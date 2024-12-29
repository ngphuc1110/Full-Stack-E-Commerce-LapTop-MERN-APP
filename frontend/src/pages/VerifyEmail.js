import React from 'react'
import SUCCESSGIF from '../assest/success.gif'
import CANCELGIF from '../assest/cancel.gif'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import { useState } from 'react'
import { useEffect } from 'react'

const VerifyEmail = () => {
    const location = useLocation();
    const [status, setStatus] = useState("");
    console.log("location", location)

    const verifyEmail = async () => {
        const userId = String(location.search).replace("?code=", "");
        console.log("userId", userId)
        const response = await fetch(SummaryApi.verify_email.url, {
            method: SummaryApi.verify_email.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ code: userId }),
        });
        const data = await response.json();

        if (data.success) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }
    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <div className='mx-auto container p-4 min-h-[583px]'>
            {
                status === "success" ? (<div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 mix-blend-multiply rounded my-20'>
                    <img src={SUCCESSGIF}
                        width={150}
                        height={150}
                    />
                    <p className='text-green-600 font-bold text-xl p-2'>Verify Successfully !!!</p>
                    <Link to={'/login'} className='p-2 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>Login</Link>
                </div>) : status === "error" ? (<div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 mix-blend-multiply rounded my-20'>
                    <img src={CANCELGIF}
                        width={150}
                        height={150}
                    />
                    <p className='text-red-600 font-bold text-xl p-2'>Verify False!!!</p>
                    <Link to={'/home'} className='p-2 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Home</Link>
                </div>) : (<div>Loading</div>)
            }
        </div>
    )
}

export default VerifyEmail