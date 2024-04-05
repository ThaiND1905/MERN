import React from 'react'

const SignUp = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    SignUp
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="accountType" value="personal"/>
                                <span className="ml-2">Personal</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input type="radio" className="form-radio" name="accountType" value="busines"/>
                                <span className="ml-2">Business</span>
                        </label>
                    </div>
                    <a href="" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account ??
                    </a>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 '>Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignUp