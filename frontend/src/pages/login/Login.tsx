import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hook/useLogIn";

const Login = () => {
    const [ username , setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const { isLoading , login } = useLogin();

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100  p-3
'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text' >Password</span>
                        </label>
                        <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <Link to={"/signup"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account ?? 
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 ' disabled={isLoading}>
                        {
                            isLoading ?
                            <span className="loading loading-spinner"></span> :
                            "Login"
                        }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login



// Static Code

// const Login = () => {
//     return (
//         <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//             <div className='h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100
// '>
//                 <h1 className='text-3xl font-semibold text-center text-gray-300'>
//                 Login
//                 <span className='text-blue-500'> ChatApp</span>
//                 </h1>

//                 <form action="">
//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text' >Username</span>
//                         </label>
//                         <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
//                     </div>

//                     <div>
//                         <label className='label p-2'>
//                             <span className='text-base label-text' >Password</span>
//                         </label>
//                         <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
//                     </div>

//                     <a href="" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//                         {"Don't"} have an account ?? 
//                     </a>

//                     <div>
//                         <button className='btn btn-block btn-sm mt-2 '>Login</button>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     )
// }