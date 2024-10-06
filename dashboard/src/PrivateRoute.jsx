import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


function PrivateRoute({ element,requiredRole }) {
	const Global_URL = import.meta.env.VITE_GLOBAL_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    // Function to check if the 'ttkon' cookie exists
    const checkAuth = () => {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find(cookie => cookie.startsWith('Pa#Ss#ToK'));
      setIsAuthenticated(!!tokenCookie);
    };

    checkAuth();
  }, []);

  useEffect(() => {

		const getCookie = (name)=> {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		  }
		  
			// get token
			const token = getCookie('Pa#Ss#ToK');
			setToken(token);
		
			fetchuserData();
			// const intervalId = setInterval(fetchuserData, 100);

  			// Clean up the interval when the component unmounts
  			// return () => clearInterval(intervalId);
	
	  }, [token]);
	
	  const fetchuserData = async () => {
		try {
		  const response = await axios.get(`${Global_URL}/api/user/${token}`);
		  const { user } = response.data;
      
		  setRole(user.role);

		} catch (error) {
		  console.error('Error fetching user data:', error);
		}
	  }
 
  
// Redirect to sign-in page if not authenticated
if (!isAuthenticated) {
  return <Navigate to="/admin/sign-in" replace />;
}

// If a specific role is required and the user's role doesn't match, redirect to home
if (requiredRole && role !== requiredRole) {
  return <Navigate to="/all-meals" replace />;
}else{
  return element;
}

// If authenticated and role matches (if required), render the element
// return element;
  // if (isAuthenticated) {
  //   return element;
  // } else {
  //   return <Navigate to="/admin/sign-in" replace />;
  // }
}

export default PrivateRoute;
