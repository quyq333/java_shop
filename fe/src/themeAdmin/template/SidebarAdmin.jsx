import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu" data-accordion="false">
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
                  <Link to="/products" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>Quản lý sản phẩm</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Quản lý khách hàng</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Quản lý đơn hàng</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
