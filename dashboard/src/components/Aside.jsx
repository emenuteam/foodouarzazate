import React, { useEffect } from "react";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";

const Aside = ({ isToggled, onToggleSidebar }) => {
  const location = useLocation();

  useEffect(() => {
    // Retrieve the saved state from localStorage when the component mounts
    const savedToggleState = localStorage.getItem("sidebarToggled");
    if (savedToggleState === null) {
      // Set default state to toggled (true) if nothing is saved
      localStorage.setItem("sidebarToggled", "true");
      onToggleSidebar(true);
    } else {
      const toggledState = savedToggleState === "true";
      if (toggledState !== isToggled) {
        onToggleSidebar(toggledState);
      }
    }

    // Set up the resize event listener
    const handleResize = () => {
      if (window.innerWidth < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
      if (window.innerWidth < 480 && !isToggled) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $(".sidebar .collapse").collapse("hide");
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Toggle classes based on state
    if (isToggled) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
    } else {
      $("body").removeClass("sidebar-toggled");
      $(".sidebar").removeClass("toggled");
    }

    // Save the toggle state to localStorage
    localStorage.setItem("sidebarToggled", isToggled);
  }, [isToggled]);

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <img src="./img/logo32.png" alt="" />
        </div>
        <div className="sidebar-brand-text mx-3">EMENU</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      
      <div className="sidebar-heading">Interface</div>

      {/* Nav Item - Pages Collapse Menu */}
      <li
        className={`nav-item ${
          location.pathname === "/" ? "active" : ""
        }`}
      >
        <Link
          className={`nav-link ${
            location.pathname === "/" ? "active" : ""
          }`}
          to="/"
        >
          <i className="fa-solid fa-layer-group"></i>
          <span>Categories</span>
        </Link>
      </li>

      {/* Nav Item - Utilities Collapse Menu */}
      <li
        className={`nav-item ${
          location.pathname === "/all-meals" ? "active" : ""
        }`}
      >
        <Link
          className={`nav-link ${
            location.pathname === "/all-meals" ? "active" : ""
          }`}
          to="/all-meals"
        >
          <i className="fas fa-utensils"></i>
          <span>Meals</span>
        </Link>
      </li>
     
      <li
        className={`nav-item ${
          location.pathname === "/settings" ? "active" : ""
        }`}
      >
        <Link
          className={`nav-link ${
            location.pathname === "/settings" ? "active" : ""
          }`}
          to="/settings"
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => onToggleSidebar(!isToggled)}
        ></button>
      </div>
    </ul>
  );
};

export default Aside;
