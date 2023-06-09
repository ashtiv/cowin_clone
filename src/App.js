import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { updateUserData } from './actions';
import ProtectedDashboard from './ProtectedDashboard';
import SuperLogin from './SuperLogin';
import SuperDashboard from './SuperDashboard';
import RegPhoneDetails from './RegPhoneDetails';

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.multiFactor) {
        const currentUserUid = user.multiFactor.user.uid;
        const phoneNumber = user.multiFactor.user.phoneNumber;
        dispatch(updateUserData(currentUserUid, phoneNumber));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/dashboard' element={<ProtectedDashboard />} />
        <Route path='/superlogin/674384' element={<SuperLogin />} />
        <Route path='/superdashboard' element={<SuperDashboard />} />
        <Route path='/regphone' element={<RegPhoneDetails />} />
      </Routes>
    </Router>
  );
}

export default App;