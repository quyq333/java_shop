import React from "react";
import Content from "./ContentProducts";
import Css from "./template/CssAdmin";
import Footer from "./template/FooterAdmin";
import Navbar from "./template/NavbarAdmin";
import Sidebar from "./template/SidebarAdmin";

import axiosConfig from "../api/axiosConfig";

function ProductsAdmin(){
    return(
        <div>
      <Css/>
      
        <div className="wrapper">
          <Navbar/>
          
          <Sidebar/>
          {/* Content Wrapper. Contains page content */}
          <Content />
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

export default ProductsAdmin

