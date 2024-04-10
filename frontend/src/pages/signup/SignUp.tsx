import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../../hook/useSignUp'

interface Info {
    fullName  : string;
    userName :string;
    password : string;
    confirmPassword :string;
    gender : "male" | "female" |" other",
}

const SignUp = () => {
    const [info, setInfo] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })

    const {isLoading, signup} = useSignUp();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signup(info as Info);
    }

    
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
'>
                <h1 className='text-3xl font-semibold text-center text-gray-300 pt-4'>
                    SignUp
                    <span className='text-pink-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit} className='p-4'>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Fullname</span>
                        </label>
                        <input type="text" placeholder='Enter your fullname' className='w-full input input-bordered h-10'
                            value={info.fullName}
                            onChange={(e) => setInfo({ ...info, fullName: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
                            value={info.userName}
                            onChange={(e) => setInfo({ ...info, userName: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'
                            value={info.password}
                            onChange={(e) => setInfo({ ...info, password: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'
                            value={info.confirmPassword}
                            onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })} />

                    </div>
                    <div className="mt-2">
                        <label className={`inline-flex items-center ${info.gender === "male" ? "selected" : ""}`}>
                            <input type="radio" className="form-radio" name="accountType" value="male" checked={info.gender === "male"} onChange={(e) => setInfo({...info, gender: e.target.value})}/>
                            <span className="ml-2">Male</span>
                        </label>
                        <label className={`ml-4 inline-flex items-center ${info.gender === "female" ? "selected" : ""}`}>
                            <input type="radio" className="form-radio" name="accountType" value="female" checked={info.gender === "female"} onChange={(e) => setInfo({...info, gender: e.target.value})}/>
                            <span className="ml-2">Female</span>
                        </label>
                        <label className={`ml-4 inline-flex items-center ${info.gender === "other" ? "selected" : ""}`}>
                            <input type="radio" className="form-radio" name="accountType" value="other" checked={info.gender === "other"} onChange={(e) => setInfo({...info, gender: e.target.value})}/>
                            <span className="ml-2">Other</span>
                        </label>
                    </div>

                    <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block justify-start'>
                        {"Already"} have an account ?? 
                    </Link>


                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 ' disabled={isLoading}>
                        {isLoading ? (<span className='loading loading-spinner'> </span>) : "Sign Up"}

                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignUp