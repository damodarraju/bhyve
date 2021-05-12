import React, { useEffect, useState } from 'react'
import Logout from '../assets/logout.svg'
import { useHistory } from "react-router";
import { fetchData, logout } from '../helpers';

function Home() {

    const [userData, setUserData] = useState([])
    const history = useHistory();

    const token = localStorage.getItem('token')

    if(!token) {
        history.push("/")
    }

    useEffect(() => {
        fetchData('profile')
        .then(response => response.json())
        .then(json => {
            setUserData(json)
        })
        .catch(err => console.log(err))   
    }, [])

    

    return (
        <div className="container mx-auto flex h-screen">
            <div className="m-auto lg:w-6/12 w-full px-10">
                <div className="flex justify-between mb-10 items-baseline">
                    <h1 className="mb-5 text-2xl font-bold">User Information</h1>
                    <div>
                        <button className="p-3 bg-blue-500 rounded-full text-white" onClick={logout}>
                            <img width="15px" src={Logout} alt="logout"/>
                        </button>
                    </div>
                </div>
                <div className="mb-5 lg:flex flex-row justify-between">
                    <div className="mb-5 lg:mb-0">
                        <label className="block text-gray-500 mb-2">First Name</label>
                        <input className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" disabled placeholder={userData.firstName} />
                    </div>
                    <div>
                        <label className="block text-gray-500 mb-2">Last Name</label>
                        <input className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" disabled placeholder={userData.lastName} />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-500 mb-2">E-mail</label>
                    <input className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="email" disabled placeholder={userData.username}/>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-500 mb-2">Skills</label>
                    <div className="flex w-full border-2 border-gray-400 border-solid px-5 py-3 overflow-auto">
                        {
                            userData.length === 0 
                            ? 
                            'Loading...' 
                            : 
                            userData.skills.map(skill => (
                                <span className="inline px-5 py-2 bg-blue-500 text-white font-bold mx-2 my-2">{skill}</span>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
