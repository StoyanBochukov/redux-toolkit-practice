import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../redux/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        //Redirest when register/login
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault()
        if(name === '' || email === ''){
            toast.error('Please fill all fields')
        }
        if(password !== password2){
            toast.error('Passwords do not match')
        }else{
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an accout</p>
        </section>

        <section className="form" onSubmit={formSubmit}>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" id='name' name='name'
                     value={name} onChange={onChange} placeholder='Enter your name'/>
                </div>

                <div className="form-group">
                     <input type="email" className="form-control" id='email' name='email' value={email}
                     onChange={onChange} placeholder='Enter your email' />
                </div>

                <div className="form-group">
                     <input type="password" className="form-control" id='password' name='password' value={password}
                     onChange={onChange} placeholder='Enter your password' />
                </div>

                <div className="form-group">
                     <input type="password" className="form-control" id='password' name='password2' value={password2}
                     onChange={onChange} placeholder='Repeat password' />
                </div>
                <div className="form-group">
                    <button className='btn btn-block'> Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register