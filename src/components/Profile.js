import React, { useEffect, useState } from 'react'
import Back from '../assets/back.svg'
import ReactPaginate from 'react-paginate';
import { useHistory } from "react-router";
import { PostUserData, PostUserSkills } from '../helpers';
import { fetchData } from '../helpers';

const PER_PAGE = 10;

function Profile() {

    const history = useHistory();

    const token = localStorage.getItem('token')

    if(!token) {
        history.push("/")
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [tab, setTab] = useState(1)

    const [skills, setSkills] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedSkills, setSelectedSkills] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const handleProfileInformation = async(e) => {
        e.preventDefault();
        setLoading(true)

        if(firstName === '' || lastName === '') {
            setErrors({message: 'Fields cannot be empty'})
            setLoading(false)
        } else {
            setErrors('')
            const data = {
                firstName, lastName
            }
            PostUserData('basic/profile', data)
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data) || response.status;
                    return Promise.reject(error);
                }

                if(response.ok) {
                    setLoading(false)
                    setErrors('')
                    getSkills()
                    setTab(2)
                }            
            })
            .catch(error => {
                setErrors(error)
                setLoading(false)
            });
        }
        
    }

    useEffect(() => {
        setLoading(true)
        fetchData('profile')
        .then(response => response.json())
        .then(json => {
            if(json.profileCompleted) {
                history.push('/home')
            } else {
                setLoading(false)
            }
        })
        .catch(err => console.log(err))
    }, [])


    const getSkills = () => {
        fetch('https://fechallenge.dev.bhyve.io/skills')
        .then(response => response.json())
        .then(json => {
            setLoading(false)
            setSkills(json)
        })
        .catch(err => console.log(err))
    }

    const handleUserSkills = (e) => {
        const target = e.target
        var value = target.value

        if(e.target.checked) {
            setSelectedSkills(selectedSkills.concat([value]))
        } else {
            selectedSkills.splice(selectedSkills.indexOf(value),  1)
        }
    }

    const offset = currentPage * PER_PAGE;

    const currentPageData = skills
    .slice(offset, offset + PER_PAGE)
    .map((skill) => 
        (
            <div key={skill.publicId} className="mb-2">
                <input type="checkbox" onChange={handleUserSkills} value={skill.skillName} />
                <label className="pl-2">{skill.skillName}</label>
            </div>
        )
    );

    const pageCount = Math.ceil(skills.length / PER_PAGE);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const handleSkillsInformation = async(e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            selectedSkills
        }
        PostUserSkills('skills', data)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data) || response.status;
                return Promise.reject(error);
            }

            if(response.ok) {
                setLoading(false)
                setErrors('')
                history.push('/home')
            }            
        })
        .catch(error => {
            setErrors(error)
            setLoading(false)
        });
    }

    return (

        <>

        {
            loading ? 
            <div className="container mx-auto flex h-screen">
                <div className="m-auto lg:w-5/12 border-1 shadow-lg p-10 rounded-md">Loading...</div>
            </div>
            :
            <div className="container mx-auto flex h-screen">
                <div className={tab === 1 ? 'm-auto lg:w-5/12 border-1 shadow-lg p-10 rounded-md' : 'hidden'}>
                    <div className="content pb-10">
                        <div className="text-right">
                            <h1 className="text-3xl font-bold pt-1">Add your Information</h1>
                        </div>
                    </div>
                    <form>
                        {errors ? <p className="pb-5 pt-0 text-xs text-red-500 text-center">{errors.message}</p> : ""}
                        <div>
                            <label className="block text-gray-500 mb-2">First Name</label>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" placeholder="Paul" />
                        </div>
                        <div className="py-5">
                            <label className="block text-gray-500 mb-2">Last Name</label>
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border-2 border-gray-400 border-solid px-5 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" placeholder="King" />
                        </div>
                        <div>
                            {
                                loading
                                ? 
                                <p className="w-full px-5 py-3 bg-gray-500 rounded-sm focus:outline-none text-white text-center font-bold">Loading...</p>
                                :
                                <button className="w-full px-5 py-3 bg-blue-500 rounded-sm focus:outline-none text-white font-bold" onClick={(e) => {handleProfileInformation(e); }}>Next</button>
                            }
                        </div>
                    </form>
                </div>

                <div className={tab === 2 ? 'm-auto lg:w-5/12 border-1 shadow-lg p-10 rounded-md' : 'hidden'}>
                    <div className="content pb-10">
                        <div className="flex justify-between">
                            <button className="focus:outline-none" onClick={() => setTab(1)}><img width="30px" src={Back} alt='back' /></button>
                            <h1 className="text-3xl font-bold pt-1">Add your skills</h1>
                        </div>                
                    </div>
                    <form>
                        <div className="py-5">
                            {errors ? <p className="pb-5 pt-0 text-xs text-red-500 text-center">{errors.message}</p> : ""}
                            <label className="block text-gray-500 mb-5">Skills</label>
                            <div>
                                <div className="flex mb-5 overflow-auto">
                                    {
                                        selectedSkills.map(skill => (
                                                <span className="inline px-5 py-2 bg-blue-500 text-white font-bold mx-2 my-2">{skill}</span>
                                        ))
                                    }
                                </div>
                                {
                                    loading ? 'Loading...' : currentPageData
                                }
                                <ReactPaginate
                                    previousLabel={"←"}
                                    nextLabel={"→"}
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination__link"}
                                    nextLinkClassName={"pagination__link"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"pagination__link--active"}
                                />
                            </div>
                        </div>
                        <div>
                            {
                                loading
                                ? 
                                <p className="w-full px-5 py-3 bg-gray-500 rounded-sm focus:outline-none text-white text-center font-bold">Loading...</p>
                                :
                                <button className="w-full px-5 py-3 bg-blue-500 rounded-sm focus:outline-none text-white font-bold" onClick={(e) => {handleSkillsInformation(e); }}>Done</button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        }

        </>
    )
}

export default Profile
