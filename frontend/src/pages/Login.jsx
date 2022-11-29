import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../redux/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = loginData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isSuccess, isLoading, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [dispatch, navigate, isSuccess, isError, user, message])

    const onChange = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault()
        if(email === '' || password === ''){
            toast.error('Please enter email and password')
        }else{
            const userData = {
                email,
                password
            }

            dispatch(login(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
     <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please login to get support</p>
        </section>

        <section className="form" onSubmit={formSubmit}>
            <form>
                <div className="form-group">
                     <input type="email" className="form-control" id='email' name='email' value={email}
                     onChange={onChange} placeholder='Enter your email' required />
                </div>

                <div className="form-group">
                     <input type="password" className="form-control" id='password' name='password' value={password}
                     onChange={onChange} placeholder='Enter your password' required />
                </div>

                <div className="form-group">
                    <button className='btn btn-block'> Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login