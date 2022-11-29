import React from 'react'
import { FaSignOutAlt, FaUser, FaSignInAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout } from '../redux/auth/authSlice'


const Header = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (  
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {!user ? ( 
                    <>
                        <li>
                            <Link to='/login'><FaSignInAlt /> Login</Link> 
                        </li>
                        <li>
                            <Link to='/register'> <FaUser />Register</Link>
                        </li>
                    </>
            ) : (
                <li>
                    <button className='btn' onClick={logoutHandler}> <FaSignOutAlt />Logout</button>
                </li>
            )}
           
        </ul>
    </header>
  )
}

export default Header