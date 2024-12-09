import React from "react";

function Sidebar() {
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="#" className="brand-link">
          <img src="theme/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Quản lý cửa hàng</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="theme/dist/img/Admin.png" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Nguyễn Hữu Quý</a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="./admin" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./products" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>Quản lý sản phẩm</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./users" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Quản lý khách hàng</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./orders" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Quản lý đơn hàng</p>
                    </a>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  )
}

export default Sidebar;