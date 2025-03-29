import "./App.css";
import React, { useEffect, useState } from "react";
import { MyContext } from './contextprovider.js';
import { useContext } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./card.js";

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const{user, setUser, list2, setList2, edited, setEdited,ID, setID} = useContext(MyContext);
  const [pagenum, setPagenum] = useState(1);
  const [showCard, setShowCard] = useState(false);
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Logout Function
  const handleLogout = async () => {
    try {
      toast.success("User Logged Out Successfully")
      setTimeout(() => {
      setUser(null); // clears user in App.js
      }, 1500);
    } catch (error) {
      toast.error("User Logout falied", error.message)
    }
  };
  
  //Gets User List 
  const getUsers = async (pagenum)=>{
    try {const response = await fetch(`https://reqres.in/api/users?page=${pagenum}`);

    if(!response.ok){
      toast.error('failed to fetch users',{position : 'top-center'} );
    }

    const data = await response.json();
    toast.success('Users fetched Successfully');
    console.log("Users :" , data.data);
    setList(data.data);
   
    setTimeout(() => {
      setShowCard(true);
    }, 1500);
    
    return data.data;
    } catch(error){
      toast.error("failed to fetch Users", error.message);
    }
  }
  
  useEffect(()=>{
    setList(list.filter((item)=>item.id!= ID));

  },[])
  
  // filters list based on the query in the search bar
  const filteredUsers = list.filter((item) =>
    item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
      
  return (
    <div className="home-container">
      <div style={{display:'flex', justifyContent : 'center', alignItems:'center', height:'70px', width: "100vw"} } className="searchbar-div">
        <h1 className="userlist">
          Users List 
        </h1>
        <input  type="search" 
                className="search-bar" 
                placeholder="Search User" 
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}>
                
        </input>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
       
       {showCard ? list.length>0 ?
          <div style={{display:'block'}}>
            <div style={{display:'flex', justifySelf : 'center'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <button  onClick={()=>{getUsers(pagenum-1)}} className="btn">ᐸ</button>
              </div>
              <div className="card-div">
                {(searchQuery ? filteredUsers : list).map((item) => (
                    <Card 
                      key={item.id} 
                      avatar={item.avatar} 
                      email={item.email} 
                      fname={item.first_name} 
                      lname={item.last_name} 
                      id={item.id} 
                      list={list}   // ✅ Pass list
                      setList={setList} // ✅ Pass setList
                    />
                  ))}
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <button   onClick={()=>{getUsers(pagenum+1)}} className="btn">ᐳ</button>
              </div>
            </div>
          </div>
            :
            <p>Data list is empty</p>
            :
            
          <div style={{display:'flex', justifySelf : 'center'}} className="popup-overlay2">
            <div className="popup-subdiv">
            <button onClick={()=>{getUsers(pagenum)}} className="get-btn">Get Users List</button> 
            </div>
          </div> }
    <ToastContainer />
    </div>
  );
}

export default Home;
