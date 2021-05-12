import React, { useState } from 'react'
import { useHistory } from "react-router";
import { Auth } from '../helpers';

function Register() {

    const history = useHistory();

    const [authLoginState, setAuthLoginState] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const token = localStorage.getItem('token')

    if(token) {
        history.push("/home")
    }

    const toggle = () => {
        setAuthLoginState(!authLoginState)
        setEmail('')
        setPassword('')
        setErrors([])
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            email, password
        }
        Auth('signup', data)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            setErrors(error)
            setLoading(false)
        });
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            email, password
        }
        Auth('signin', data)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data) || response.status;
                return Promise.reject(error);
            }
            setLoading(false)
            localStorage.setItem('token', data.accessToken);
            history.push('/user/profile')
        })
        .catch(error => {
            setErrors(error)
            setLoading(false)
        });
    }

    return (
        <div className="container mx-auto flex h-screen">
            <div className="m-auto lg:w-5/12 border-1 shadow-lg p-10 rounded-md">
                {
                    authLoginState ? 
                    <div className="content pb-10">
                        <span className="uppercase text-gray-500 font-bold text-xs">Lorem Ipsum Dolor</span>
                        <h1 className="text-3xl font-bold pb-5 pt-1">Login to Lorem.</h1>
                        <div>
                            <span>Don't have an account?</span><button className="text-blue-500 font-bold ml-2 focus:outline-none" href='#' onClick={toggle}> Create an account</button>
                        </div>
                    </div>
                    :
                    <div className="content pb-10">
                        <span className="uppercase text-gray-500 font-bold text-xs">Start for free</span>
                        <h1 className="text-3xl font-bold pb-5 pt-1">Sign Up to Lorem.</h1>
                        <div>
                            <span>Already a member?</span><button className="text-blue-500 font-bold ml-2 focus:outline-none" onClick={toggle}> Log In</button>
                        </div>
                    </div>
                }
                <form>
                    {errors.statusCode === 400 ? <p className="pb-5 pt-0 text-xs text-red-500 text-center">{errors.message[0]}</p> : ""}
                    {errors.statusCode === 409 ? <p className="pb-5 pt-0 text-xs text-red-500 text-center">{errors.message}</p> : ""}
                    {errors.statusCode === 401 ? <p className="pb-5 pt-0 text-xs text-red-500 text-center">{errors.message}</p> : ""}
                    {success === '' ? '' : <p className="pb-5 pt-0 text-xs text-green-500 text-center">{success}</p>}
                    <div>
                        <label className="block text-gray-500 mb-2">E-mail</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="email" placeholder="name@mail.com" />
                    </div>
                    <div className="py-5">
                        <label className="block text-gray-500 mb-2">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="password" placeholder="6+ Characters, 1 Capital letter" />
                    </div>

                    {
                        authLoginState ? 
                        <div>
                            {
                                loading
                                ? 
                                <p className="w-full px-5 py-3 bg-gray-500 rounded-sm focus:outline-none text-white text-center font-bold">Loading...</p>
                                :
                                <button className="w-full px-5 py-3 bg-blue-500 rounded-sm focus:outline-none text-white font-bold" onClick={(e) => {handleLogin(e); }}>Login</button>
                            }
                        </div>
                        :
                        <div>
                            {
                                loading
                                ? 
                                <p className="w-full px-5 py-3 bg-gray-500 rounded-sm focus:outline-none text-white text-center font-bold">Loading...</p>
                                :
                                <button className="w-full px-5 py-3 bg-blue-500 rounded-sm focus:outline-none text-white font-bold" onClick={(e) => {handleRegister(e); }}>Create an account</button>
                            }
                        </div>
                    }

                </form>
            </div>
        </div>
    )
}

export default Register
