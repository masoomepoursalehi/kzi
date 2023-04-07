import React from 'react';
import { Route, Routes } from 'react-router';
import Cart from './components/Cart';
import Home from './components/Home'
import OneProduct from './components/OneProduct';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Address from './components/Address';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import OneOrder from './components/OneOrder';
import Setting from './components/setting/Setting';
import ChangeProfile from './components/setting/ChangeProfile';
import ChangePassword from './components/setting/ChangePassword';
import UploadAvatar from './components/setting/UploadAvatar';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';


const Routers = () => {
  const { data } = useSelector((state) => state.profile);
  const available = (data.success === true) ? true : false;
  return (
    <div>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<OneProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={!localStorage.getItem('token') ? <Login /> : <NotFound />} />
        <Route path='/address' element={localStorage.getItem('token') ? <Address /> : <NotFound />} />
        <Route path='/checkout' element={localStorage.getItem('token') ? <Checkout /> : <NotFound />} />
        <Route path='/orders' element={localStorage.getItem('token') ? <Orders /> : <NotFound />} />
        <Route path='/orders/:id' element={localStorage.getItem('token') ? <OneOrder /> : <NotFound />} />
        <Route path='/profile' element={localStorage.getItem('token') ? <Profile /> : <NotFound />} />

        <Route path='/setting' element={localStorage.getItem('token') ? <Setting /> : <NotFound />}>
          <Route path='change-profile' element={localStorage.getItem('token') ? <ChangeProfile /> : <NotFound />} />
          <Route path='change-password' element={localStorage.getItem('token') ? <ChangePassword /> : <NotFound />} />
          <Route path='upload-avatar' element={localStorage.getItem('token') ? <UploadAvatar /> : <NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}
export default Routers;