import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [title, setTitle] = useState("Dashboard");

  useEffect(() => {
    const titles = {
      "/": "Dashboard",
      "/upload-blogs": "Upload Blogs",
      "/manage-blogs": "Manage Blogs",
      "/all-queries": "All Queries",
      "/exam-registrations": "Exam Registrations",
      "/exam-results": "Exam Results",
      "/add-student": "Add Student",
    };
    setTitle(titles[location.pathname] || "Dashboard");
  }, [location.pathname]);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm px-3 py-2 mb-4">
      <div className="container-fluid d-flex justify-content-start align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler me-2"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            type="button"
            id="sidebarToggle"
          >
            <i className="fas fa-bars" aria-hidden="true"></i>
          </button>
          <div className="dashboard-header">
            <h1 className="dashboard-title m-0">{title}</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;