import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allowlist.css";

const Allowlist = () => {
  const GLOBAL_URL = import.meta.env.VITE_GLOBAL_URL;
  const API_URL = `${GLOBAL_URL}/api/allowlist`;

  const [email, setEmail] = useState("");
  const [allowlist, setAllowlist] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [EmailUser, setEmailUser] = useState("");
  const [token, setToken] = useState("");
	

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    // get token
    const token = getCookie("Pa#Ss#ToK");
    setToken(token);

    fetchuserData();
    // const intervalId = setInterval(fetchuserData, 100);

    // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, [token]);

  const fetchuserData = async () => {
    try {
      const response = await axios.get(`${GLOBAL_URL}/api/user/${token}`);
      const { user } = response.data;
      setEmailUser(user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    
    const fetchAllowlist = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        if (Array.isArray(response.data.emails)) {
          setAllowlist(response.data.emails);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Error fetching allowlist"
        );
      }
    };

    fetchAllowlist();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000); // Clear message and error after 5 seconds

      return () => clearTimeout(timer); // Cleanup/ timer on component unmount
    }
  }, [message, error]);
  const handleAddEmail = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await axios.post(`${API_URL}/add`, { email });
      setMessage("Email added to allowlist");
      setError("");
      setEmail("");

      const response = await axios.get(`${API_URL}`);
      if (Array.isArray(response.data.emails)) {
        setAllowlist(response.data.emails);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Error adding email"
      );
      setMessage("");
    }
  };

const handleDeleteEmail = async (email) => {
  try {
    await axios.post(`${API_URL}/delete`, {  email  });
    setMessage("Email removed from allowlist");
    setError("");
    const response = await axios.get(`${API_URL}`);
    if (Array.isArray(response.data.emails)) {
      setAllowlist(response.data.emails);
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (err) {
    setError(
      err.response?.data?.error || err.message || "Error removing email"
    );
    setMessage("");
  }
};


  return (
    <div className="container mt-5 allow-content">
      <h2 className="mb-4">Allowlist</h2>
      <div className="mb-3">
        <div className="input-group">
          <input
            type="email"
            className="form-control mr-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <button className="btn btn-primary" onClick={handleAddEmail}>
            Add Email
          </button>
        </div>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allowlist) && allowlist.length > 0 ? (
              allowlist.map((item, index) => {
                return(
                EmailUser !== item.email ? (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{formatDate(item.updatedAt)}</td>
                        <td>
                          <button
                            className="btn delete-btn"
                            onClick={() => handleDeleteEmail(item.email)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ):null)
              })
            ) : (
              <tr>
                <td colSpan="4">No emails found in allowlist</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allowlist;
