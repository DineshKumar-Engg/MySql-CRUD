import React,{ useContext, useEffect, useReducer, useState } from 'react'
import axios from "axios";
import '../Styles/Employee.css'
import { Store } from '../Store';
import Loading from './Loading';
import {toast} from 'react-toastify'


const reducer =(state,action)=>{
    switch(action.type){
        case "REQUEST LOADING":
            return {...state,loading:true}
        case "REQUEST SUCCESS":
            return {...state,loading:false}
        default:
            return state
    }
}



const EmployeeList = () => {

    const [{loading},dispatch]=useReducer(reducer,{
        loading:false,
    })

    const { dispatchEvent } = useContext(Store)

    const [EmployeeList,SetEmployeeList]=useState([])

        
        
    useEffect(()=>{

            dispatch({type:"REQUEST LOADING"})

            const {data}= axios.get(`${process.env.REACT_APP_SERVER_URL}/list`)
            .then((res)=>{
                SetEmployeeList(res.data.data)
            })
            .catch((error)=>{console.log(error)})
            console.log(data);
            dispatch({type:"REQUEST SUCCESS"})

    },[])

const handleDelete = async (id)=>{
    dispatch({type:"REQUEST LOADING"})
    try{
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/employee/`+id)
        .then((res)=>{
            toast.success(res.data,{autoClose:2000})
            console.log(res.data);
        })
    }catch(err){
        console.log(err);
    }
    dispatch({type:"REQUEST SUCCESS"})
    // window.location.reload()

}
const [edit,setEdit]=useState('')
 
 const handleEdit = async(id)=>{

    try{

      const {data}=  await axios.get(`${process.env.REACT_APP_SERVER_URL}/employee/`+id)
       setEdit(data[0])
       console.log(data);
    }catch(err){
        console.log(err);
    }
    dispatchEvent("DATA",{userId:edit})
}

  return (
    <div className='employee-container'>
        <div className='employee-main' >
            <div className='employee-title'>
                <h1>Employee Details</h1>
            </div>
        <div className='employee-tableMain'>
            <div className='employee-table'>
            <table>
                <thead>
                     <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>sex</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Joined Date</th>
                    <th>department</th>
                    <th>position</th>
                    <th>salary</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

            {
                loading ? (<Loading/>):
                (
                    EmployeeList.map(data=>(
                       
                        <tr key={data.id}>
                            <td><img src={`http://localhost:5000/photo/${data.photo}`} className='employee-profile' alt=''></img></td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.sex}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.address}</td>
                            <td>{data.joinedDate}</td>
                            <td>{data.department}</td>
                            <td>{data.position}</td>
                            <td>{data.salary}</td>
                            <td>
                                <div className='employee-button'>
                                <button onDoubleClick={()=>{handleEdit(data.id)}} >Edit</button>
                                <button onClick={()=>handleDelete(data.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                       
                        ))
                )
            }
             </tbody>
           
        </table>
       
            </div>
        </div>
    </div>
    </div>
  )
 

}

export default EmployeeList