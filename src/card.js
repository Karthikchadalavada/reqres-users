import React, { useContext, useState } from 'react';
import { MyContext } from './contextprovider';
import Edit from './edit';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ avatar, email, fname, lname, id, list, setList }) => {
  const { showEditModal, setShowEditModal,ID, setID } = useContext(MyContext);

  // User deleting Function
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) throw new Error('Failed to delete user');
  
      console.log(`User with ID ${id} deleted successfully`);
      toast.success("User Deleted Successfully");
      setTimeout(() => {
      setID(id);
        
      }, 1500);
      
    } catch (error) {
      toast.error("error Deleting User", error.message, {position : 'top-center'});
    }
  };
  
  

  return (
    <div className='usersList-div'>
      <div className='avatar-div'>
        <img src={avatar} className='avatar' alt="User Avatar" />
      </div>
      <div className='userdetails'>
        <div style={{display:'flex', justifyContent: "center"}}>
          <div>
              <div style={{display:'flex', justifyContent: "start", height:'40px'}}>
              <p className='fname'><strong>
                <div style={{width:'100px'}}>First Name :</div></strong>{fname}</p>
            </div>
            <div style={{display:'flex', justifyContent: "start" , height:'40px'}}>
              <p className='lname'><strong>
                <div style={{width:'100px'}}>Last Name : </div></strong>{lname}</p>
            </div>
            <div style={{display:'flex', justifyContent: "start" , height:'40px'}}>
              <p className='email'><strong>
                <div style={{width:'100px'}}>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </div></strong>{email}</p>
            </div>
          </div>

        </div>
      </div>
      <div className='btns-div'>
        <button 
          className='edit-btn' 
          onClick={() => setShowEditModal({ isOpen: true, user: { fname, lname, email, id } })}
        >
          Edit
        </button>
        <button className='del-btn' onClick={()=>{deleteUser(id)}}>Delete</button>
      </div>

      {showEditModal?.isOpen && showEditModal?.user && (
        <div className='popup-overlay1' onClick={() => setShowEditModal({ isOpen: false, user: null })}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <Edit 
              fname={showEditModal.user.fname} 
              lname={showEditModal.user.lname} 
              email={showEditModal.user.email} 
              id={showEditModal.user.id}
              list={list}   // ✅ Pass list to Edit.js
              setList={setList} // ✅ Pass setList to Edit.js
              setShowEditModal={setShowEditModal} // ✅ Ensure modal closes after edit
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
