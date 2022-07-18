import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import apiAxios from "../api/index";
import {ToastContainer, toast} from "react-toastify";
import moment from "moment";
import {handleAuth} from "../redux/auth";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";

const ProfileDetail = () => {
    const {authData} = useSelector(state => state.auth)
    const {token} = useSelector(state => state.auth)
    const [profile, setProfile] = useState({...authData})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentColor} = useStateContext();
    let userId = authData?._id

    const Msg = ({closeToast, toastProps}) => (
        <div>
            Lorem ipsum dolor {toastProps.position}
            <button>Retry</button>
            <button onClick={closeToast}>Close</button>
        </div>
    )
    const displayMsg = () => {
        toast(<Msg/>)
        // toast(Msg) would also work
    }

    const deleteAccount = () => {
        apiAxios.put(`/base/User/${profile._id}`, {data: {isBlocked: !profile.isBlocked}}).then(() => {
            toast.success("DeletedAccount")
            setTimeout(() => {
                localStorage.removeItem("token")
                window.location.href = "/"
            }, 1000)
        })
    }

    const save = (e) => {
        e.preventDefault()
        apiAxios.put(`/base/User/${userId}`, {data: profile}).then(() => {
            dispatch(handleAuth({authData: profile, token: token}))
            displayMsg()
        }).catch(e => {
            console.log(e)
        })
    }


    useEffect(() => {
        setTimeout(() => {
            if (!token) {
                toast.info("PleaseFirstLogin")
                navigate("/auth")
            }
        }, 1000)
    }, [])

    if (!profile || !authData) return <div
        className="flex w-full justify-center align-middle h-full">Loading...</div>;
    return (
        <div className="container mx-auto">
            <div>
                <div>
                    <div className="text-center mt-20 mb-4 ml-5 dark:text-gray-300"
                         style={{color: currentColor}}>Welcome
                        Profile {`${(authData.name || "")} ${(authData.lastname || "")}`}</div>
                </div>
            </div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                            name</label>
                        <input type="text" id="name" defaultValue={authData?.name}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" required
                               onChange={(e) => setProfile({...profile, name: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="lastname"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                            name</label>
                        <input type="text" id="lastname" defaultValue={authData?.lastname}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Doe" required=""
                               onChange={(e) => setProfile({...profile, lastname: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                            address</label>
                        <input type="email" id="email " defaultValue={authData?.email}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="ohn.doe@company.com"
                               onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="phone"
                               className="block mb-2 text-sm font-medium text-  gray-900 dark:text-gray-300">Phone
                            number</label>
                        <input type="tel" id="phone" defaultValue={authData?.phone}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="123-45-678"
                               onChange={(e) => setProfile({...profile, phone: e.target.value})}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" defaultValue={authData?.password}
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                        <input type="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="•••••••••" required=""
                               onChange={(e) => setProfile({...profile, password: e.target.value})}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm_password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                            password</label>
                        <input type="password" id="confirm_password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="•••••••••" required=""
                               onChange={(e) => setProfile({...profile, confirmPassword: e.target.value})}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="join_date"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Joined
                            Date</label>
                        <input type="text" id="join_date" defaultValue={moment(authData?.createdAt).format("LLLL")}
                               disabled
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </div>
                <button type="submit" style={{backgroundColor: currentColor, color: "white"}}
                        onClick={save}
                        className="w-full text-md align-middle justify-center flex rounded-lg p-3 hover:bg-light-gray">
                    Save
                </button>
            </form>
        </div>
    )
}

export default ProfileDetail;