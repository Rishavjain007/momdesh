import React, { useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = forwardRef(({ className = "" }, ref) => {
  const internalRef = useRef(null);
  const sidebarRef = ref || internalRef;
  const [openCollapse, setOpenCollapse] = useState(null);

  const toggleCollapse = (section) => {
    setOpenCollapse((prev) => (prev === section ? null : section));
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar position-fixed top-0 start-0 vh-100 ${className}`}
      id="sidebar"
    >
      <div className="logo mt-4 d-flex align-items-center justify-content-between px-3">
        <img
          src="flat-design-letter-t-logo-template_23-2149355278-removebg-preview.webp"
          alt="Tipsgalwar Logo"
          style={{ height: "40px" }}
        />
        <div className="logo-text ms-2">tipsgalwar</div>
        <button
          className="sidebar-close-btn btn btn-link text-decoration-none"
          onClick={() => {
            document.getElementById("sidebar").classList.remove("show");
          }}
          aria-label="Close Sidebar"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <hr />

      <div className="nav-section px-3">HOMEPAGE</div>
      <ul className="nav flex-column px-2">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <button
            className="nav-link collapsed btn btn-toggle d-flex justify-content-between align-items-center"
            onClick={() => toggleCollapse("blogs")}
            aria-expanded={openCollapse === "blogs"}
            aria-controls="blogs-collapse"
            type="button"
          >
            <span><i className="fas fa-blog me-2"></i> Blogs</span>
            <i className={`fas fa-chevron-${openCollapse === "blogs" ? "up" : "down"} dropdown-icon`}></i>
          </button>
          {openCollapse === "blogs" && (
            <ul className="nav flex-column ps-3" id="blogs-collapse">
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/upload-blogs">
                  <i className="fas fa-upload me-2"></i> Upload Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/manage-blogs">
                  <i className="fas fa-cog me-2"></i> Manage Blogs
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <button
            className="nav-link collapsed btn btn-toggle d-flex justify-content-between align-items-center"
            onClick={() => toggleCollapse("query")}
            aria-expanded={openCollapse === "query"}
            aria-controls="query-collapse"
            type="button"
          >
            <span><i className="fas fa-envelope me-2"></i> Website Query</span>
            <i className={`fas fa-chevron-${openCollapse === "query" ? "up" : "down"} dropdown-icon`}></i>
          </button>
          {openCollapse === "query" && (
            <ul className="nav flex-column ps-3" id="query-collapse">
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/all-queries">
                  <i className="fas fa-list me-2"></i> All Queries
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/new-queries">
                  <i className="fas fa-plus-circle me-2"></i> New Queries
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/resolved-queries">
                  <i className="fas fa-check-circle me-2"></i> Resolved
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

      <div className="nav-section px-3">EXAM</div>
      <ul className="nav flex-column px-2">
        <li className="nav-item">
          <button
            className="nav-link collapsed btn btn-toggle d-flex justify-content-between align-items-center"
            onClick={() => toggleCollapse("exam")}
            aria-expanded={openCollapse === "exam"}
            aria-controls="exam-collapse"
            type="button"
          >
            <span><i className="fas fa-book me-2"></i> Exam</span>
            <i className={`fas fa-chevron-${openCollapse === "exam" ? "up" : "down"} dropdown-icon`}></i>
          </button>
          {openCollapse === "exam" && (
            <ul className="nav flex-column ps-3" id="exam-collapse">
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/exam-registrations">
                  <i className="fas fa-user-graduate me-2"></i> Exam Registrations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link dropdown-item" to="/exam-results">
                  <i className="fas fa-clipboard-check me-2"></i> Exam Results
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

      <div className="nav-section px-3">Add New</div>
      <ul className="nav flex-column mb-4 px-2">
        <li className="nav-item">
          <Link className="nav-link" to="/add-student">
            <i className="fas fa-user-plus me-2"></i> Add Student
          </Link>
        </li>
      </ul>
    </div>
  );
});

export default Sidebar;