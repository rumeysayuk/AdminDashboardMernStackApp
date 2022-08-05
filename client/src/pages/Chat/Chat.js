import React, {Fragment, useState} from 'react';
import {Button, Input} from "antd";
import {Label} from "@material-ui/icons";
import {useStateContext} from "../../contexts/ContextProvider";
import apiAxios from "../../api";
import {handleAuth} from "../../redux/auth";
import {toast} from "react-toastify";


const ChatPage = () => {
    const [chatroomName, setChatroomName] = useState("");
    const {currentColor} = useStateContext();
    const save = (e) => {
        e.preventDefault()
        apiAxios.post(`/chatrooms/create-chatroom`, {data: chatroomName}).then((res) => {
            console.log(res)
        }).catch(e => {
            toast.error(e.response.data.message)
        })
    }
    console.log(chatroomName)
    return (
        <div className={"mt-2 md:m-10 p-2 md:p-10  bg-white rounded-3xl flex justify-between"}>
            {!chatroomName ? (<div>
                    <label htmlFor="name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                        name</label>
                    <input type="text" id="name" defaultValue={""}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Winx" required
                           onChange={(e) => setChatroomName({...chatroomName, name: e.target.value})}/>
                    <button type="submit" style={{backgroundColor: currentColor, color: "white"}}
                            onClick={save}
                            className="w-full text-md align-middle justify-center flex rounded-lg p-3 hover:bg-light-gray">
                        Save
                    </button>

                </div>):
                (<Fragment>
                    <div className={""}>vbdfgf</div>
                    <div className={""}>cfbg</div>
                    )
                </Fragment>)}

        </div>
    );
};

export default ChatPage;