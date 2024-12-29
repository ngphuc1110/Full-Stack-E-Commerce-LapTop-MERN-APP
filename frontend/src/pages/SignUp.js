import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
        profilePic: "",
        status: "",
        address: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) => {
            return {
                ...preve,
                profilePic: imagePic
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            console.log("SummaryApi.signUp.url", SummaryApi.signUp.url)

            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } else {
            toast.error("Check password and confirm password again")
        }


    }

    console.log("data login", data)
    return (
        <section id="signup">
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 py-5 w-full max-w-md mx-auto'>
                    <div className=' w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-70 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full font-bold'>
                                    Upload
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>

                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="text"
                                    placeholder='enter your name'
                                    name='name'
                                    value={data.name}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email"
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showPassword ? "" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span >
                                        {
                                            showPassword ? (<FaEyeSlash />) : (<FaEye />)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password :</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input type={showConfirmPassword ? "" : "password"}
                                    placeholder='confirm password'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span >
                                        {
                                            showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Address :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="text"
                                    placeholder='enter your address'
                                    name='address'
                                    value={data.address}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Phone Number:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="text"
                                    placeholder='enter your phone number'
                                    name='phone'
                                    value={data.phone}
                                    required
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 '>Sign Up</button>
                        </div>

                        <p className='my-5 mx-auto'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default SignUp