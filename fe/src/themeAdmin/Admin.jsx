import React from 'react';
import Css from './template/CssAdmin';
import Navbar from './template/NavbarAdmin';
import Sidebar from './template/SidebarAdmin';
import Footer from './template/FooterAdmin';
import AdminContent from './AdminContent';

function Admin() {
  return (
    <div>
      <Css/>
      
        <div className="wrapper">
          <Navbar/>
          
          <Sidebar/>
          {/* Content Wrapper. Contains page content */}
          <AdminContent/>
          <Footer/>
          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
        </div>
       
      </div>
    
  )
}
export default Admin;
