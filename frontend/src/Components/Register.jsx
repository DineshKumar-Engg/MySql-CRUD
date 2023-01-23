import React, { useContext, useEffect,useReducer,useState } from 'react'
import '../Styles/Register.css'
import axios from 'axios'
import { departs } from '../data'
import { position } from '../data'
import { Store } from '../Store'
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

const Register = () => {
  const [AddEmployee, setAddEmployee] = useState()

  const { user } = useContext(Store)


  const [{loading},dispatch]=useReducer(reducer,{
    loading:false,

})
  useEffect(() => {
    setInput(user)
  }, [user, AddEmployee])

  const [input, setInput] = useState(
    {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      joinedDate: '',
      department: '',
      position: '',
      salary: '',
      sex: '',
    }
  )

  const [file, setFile] = useState(null)



  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("address", input.address)
    formData.append("joinedDate", input.joinedDate)
    formData.append("department", input.department)
    formData.append("position", input.position)
    formData.append("salary", input.salary)
    formData.append("sex", input.sex)
    formData.append("photo", file)
    if(!input.name || ! input.email ||
      ! input.phoneNumber || ! input.address ||
      ! input.joinedDate || ! input.department ||
      ! input.position || ! input.salary ||
      ! input.sex || ! file
      )
    {
      return SetError("Please Fill All Details")
      
    }

      try {
        dispatch({type:"REQUEST LOADING"})
  
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/employee/` + user.id, formData)
          .then((res) => {
            SetError("Successfully Updated")
           console.log(res);
          })
          dispatch({type:"REQUEST SUCCESS"})

        }
      catch (err) {
        console.log("Error : ", err)
      }
      // window.location.reload()
      setInput('')
      setFile('')
      SetError('')
    
    
  }
const [error,SetError]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("address", input.address)
    formData.append("joinedDate", input.joinedDate)
    formData.append("department", input.department)
    formData.append("position", input.position)
    formData.append("salary", input.salary)
    formData.append("sex", input.sex)
    formData.append("photo", file)

    if(!input.name || ! input.email ||
      ! input.phoneNumber || ! input.address ||
      ! input.joinedDate || ! input.department ||
      ! input.position || ! input.salary ||
      ! input.sex || ! file
      )
    {
      return SetError("Please Fill All Details")
      
    }

    try {
      dispatch({type:"REQUEST LOADING"})

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/employee`, formData)
        .then((res) => {
          toast.success("Successfully Created",{autoClose:2000})
          SetError("Successfully Created")
        })
      
        
    }
    catch (err) {
      console.log("Error : ", err)
    }
    // window.location.reload()
    dispatch({type:"REQUEST SUCCESS"})
    setInput('')
    setFile('')
  }



  return (
    <div className='box'>
      <h1 className="form-title">Employee Registration</h1>
      {error.length > 0 && (<div className='error'><h2>{error}</h2></div>)}

    {
      loading ? (<Loading/>):
      (
        <form className='form' onSubmit={handleSubmit}>
        
        <div className="form-group">
          <input type={"text"} name="name" value={input.name} onChange={handleChange} className="form-control" required />
          <label className="form-label">Name</label>
        </div>
        <div className="form-group">
          <input type={"text"} name="email" value={input.email} onChange={handleChange} className="form-control" required />
          <label className="form-label">Email</label>
        </div>
        <div className="form-group">
          <input type={"text"} name="phoneNumber" value={input.phoneNumber} onChange={handleChange} className="form-control" id="txtpassword" required />
          <label className="form-label">Phone Number</label>
        </div>
        <div className="form-group">
          <input type={"text"} name="address" value={input.address} onChange={handleChange} className="form-control" id="txtpassword" required />
          <label className="form-label">Address</label>
        </div>
        <div className="form-group">
          <input type={"date"} name="joinedDate" value={input.joinedDate} onChange={handleChange} className="form-control" id="txtpassword" required />
          <label className="form-label">Joined Date</label>
        </div>
        <div className="form-group">
          <select
            name="department"
            onChange={handleChange}
            value={input.department}
          >
            {
              departs.map((option, index) => (

                <option key={index} label={option.label}>{option.value}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <select
            name="position"
            onChange={handleChange}
            value={input.position}
          >
            {
              position.map((option, index) => (

                <option key={index}>{option.value}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <input type={"number"} name="salary" value={input.salary} onChange={handleChange} className="form-control" id="txtpassword" required />
          <label className="form-label">Salary</label>
        </div>
        <div className="form-group">
          <input type={"checkbox"} name='sex' value="Men" onChange={handleChange} />
          <label className='showlabel' >Men</label>
          <input type={"checkbox"} name='sex' value="Woman" onChange={handleChange} />
          <label className='showlabel' >Woman</label>
          <input type={"checkbox"} name='sex' value="Other" onChange={handleChange} />
          <label className='showlabel'>Others</label>
        </div>
        <div className="form-group">
          <input type={"file"} accept='image/*' name="photo" style={{ cursor: 'pointer' }} onChange={handleChange} className="form-control"/>
          <label className="form-label">Profile Photo</label>
        </div>
        <div className="form-sign">

          {
            user.length === 0 ? (
              <button type={"submit"} className="btn">
                Submit
              </button>
            ) : (
              <button type={"button"} className="btn" onClick={handleUpdate}>
               Update
              </button>
            )
          }

          <button type={"button"} className="btn" onClick={() => setAddEmployee(false)}>
            Cancel
          </button>
        </div>
      </form>

      )
    }
      
    </div>
  )
}

export default Register