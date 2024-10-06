import React, {useEffect, useState } from "react";
import axios from 'axios';

// import Item from "./components/AsideItem";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";

const Root = () => {
	const Global_URL = import.meta.env.VITE_GLOBAL_URL;
	const [fullName, setFullName] = useState('');
	const [role, setRole] = useState('');
  	const [token, setToken] = useState('');
	const [isSidebarToggled, setIsSidebarToggled] = useState(false);


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
		  setFullName(user.full_name);
		  setRole(user.role);
		  
		} catch (error) {
		  console.error('Error fetching user data:', error);
		}
	  }
	

    const handleSidebarToggle = () => {
        setIsSidebarToggled(prevState => !prevState);
    };

	return (
		<div id="wrapper">
			<Aside isToggled={isSidebarToggled} onToggleSidebar={handleSidebarToggle} />
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<NavBar onToggleSidebar={handleSidebarToggle} FullName={fullName} Role={role} />
					<div className="container-fluid">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Root;
