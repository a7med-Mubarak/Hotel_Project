// import React, { useContext } from 'react'
// import Navbar from '../Navbar/Navbar'
// import { Outlet } from 'react-router-dom'
// import Footer from '../Footer/Footer'
// import { AuthContext } from '../../../../context/AuthContext'

// export default function MasterLayout() {

//   const { userData } = useContext(AuthContext)

//   return (
//     <>
//     {userData?.userGroup === "Manager" ? (""): (<Navbar/>)}


//         <Outlet/>
//     {userData?.userGroup === "Manager" ? (""): (<Footer/>)}

//     </>

//   )
// }

import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../../../context/AuthContext';

export default function MasterLayout() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext?.userData?.userGroup === 'admin' && <Navbar />}
      <Outlet />
      {authContext?.userData?.userGroup === 'Manager' && <Footer />}
    </>
  );
}
