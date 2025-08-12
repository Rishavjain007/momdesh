import React, { useEffect, useState } from "react";
import "../App.css";
import Calendar from "./Calendar"; // Import your Calendar component

function Home() {
  // Dashboard stats state
  const [stats, setStats] = useState({
    blogs: { total: 0, updatedAt: "" },
    queries: { total: 0, lastQuery: "" },
    students: { total: 0, lastRegistered: "" },
  });

  // Fetch data from APIs for stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch blogs
        const blogsRes = await fetch("https://admin-backend-wbbc.onrender.com/api/blogs");
        const blogsData = await blogsRes.json();

        // Fetch queries
        const queriesRes = await fetch("https://admin-backend-wbbc.onrender.com/api/contact");
        const queriesData = await queriesRes.json();

        // Fetch students (registrations)
        const studentsRes = await fetch("https://admin-backend-wbbc.onrender.com/api/registration");
        const studentsData = await studentsRes.json();

        setStats({
          blogs: {
            total: Array.isArray(blogsData) ? blogsData.length : blogsData.blogs?.length || 0,
            updatedAt:
              (Array.isArray(blogsData) && blogsData.length > 0
                ? blogsData[0].updatedAt || blogsData[0].createdAt
                : "") || "",
          },
          queries: {
            total: Array.isArray(queriesData) ? queriesData.length : queriesData.queries?.length || 0,
            lastQuery:
              (Array.isArray(queriesData) && queriesData.length > 0
                ? queriesData[0].createdAt
                : "") || "",
          },
          students: {
            total: Array.isArray(studentsData) ? studentsData.length : 0,
            lastRegistered:
              (Array.isArray(studentsData) && studentsData.length > 0
                ? studentsData[0].timestamp
                : "") || "",
          },
        });
      } catch (err) {
        // Silent fail for dashboard display
      }
    };
    fetchStats();
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "";

  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
          {/* Stats Cards */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="stat-card gradient-blue">
                <div className="icon">
                  <i className="fas fa-blog"></i>
                </div>
                <h3>{stats.blogs.total}</h3>
                <p>Total Blogs</p>
                <div className="update-info">
                  <i className="fas fa-arrow-up"></i>
                  <span>
                    Updated At {stats.blogs.updatedAt ? formatDate(stats.blogs.updatedAt) : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="stat-card gradient-green">
                <div className="icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>{stats.queries.total}</h3>
                <p>Website Queries</p>
                <div className="update-info">
                  <i className="fas fa-arrow-up"></i>
                  <span>
                    Last query {stats.queries.lastQuery ? formatDate(stats.queries.lastQuery) : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="stat-card gradient-orange">
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>{stats.students.total}</h3>
                <p>All Students</p>
                <div className="update-info">
                  <i className="fas fa-arrow-up"></i>
                  <span>
                    Last registered{" "}
                    {stats.students.lastRegistered ? stats.students.lastRegistered : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section replaced with Calendar component */}
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
