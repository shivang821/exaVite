import React, { useEffect, useState } from 'react'
import './header.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchBar from './searchBar/SearchBar'
import logo from '../../images/logo4.png'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';
import { loadCart, clearError } from '../../actions/cartAction';
const Header = () => {
  const navigate = useNavigate()
  const { cartItems, error } = useSelector(state => state.Cart)
  const { user, isAuthenticate } = useSelector(state => state.User);
  // const cartNumber = cartItems.length;
  const dispatch = useDispatch()
  const userLogout = () => {
    dispatch(logout())
    window.location.reload()
  }
  const goToHome = () => {
    navigate('/')
  }
  useEffect(() => {
    dispatch(loadCart())
    if (error) {
      dispatch(clearError())
    }
  }, [isAuthenticate])
  return (
    <>
      <div className='header'>
        <div className="brand">
          <img style={{ cursor: 'pointer' }} onClick={goToHome} src={logo} alt="" />
        </div>
        <div className="centerDiv">
          <SearchBar />
        </div>
        <div className="rightDiv">
          <div className='cartDiv'>
            <ShoppingCartOutlinedIcon onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }} />
            <div className='cartNumber' ><p>{cartItems && cartItems.length}</p></div>
          </div>
          <div className="menuDiv">
            <MenuIcon style={{ cursor: 'pointer' }} className='menuBar MuiAvatar-root' />
            <div className={isAuthenticate ? 'menuItems' : 'loginMenu'}>
              {isAuthenticate ?
                <ul>
                  <li> <NavLink to='/account/me'>My Account </NavLink></li>
                  <li> <NavLink to='/myorder'>My Orders</NavLink></li>
                  {user && user.role === 'seller' ?
                    <li> <NavLink to='/dashboard/home'> Dashboard</NavLink></li> :
                    <li><NavLink to='/becomeaseller' >Become a Seller</NavLink></li>
                  }
                  <li onClick={userLogout}> <NavLink to=''> Log Out</NavLink></li>
                </ul> :
                <ul>
                  <li><NavLink to='/login' >Login</NavLink></li>
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="linkHeaderMain">
        <div className='linksHeader'>
          <div>
            <NavLink to='/product/?category=fashion' >Fashion</NavLink>
          </div>
          <div>
            <NavLink to='/product/?category=mobiles' >Mobiles</NavLink>
          </div>
          <div>
            <NavLink to='/product?category=electronics' >Electronics</NavLink>
          </div>
          <div>
            <NavLink to='/product?category=furniture' >Furniture</NavLink>
          </div>
          <div>
            <NavLink to='/product?category=appliances' >Appliances</NavLink>
          </div>
          <div>
            <NavLink to='/product?category=grocery' >Grocery</NavLink>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header