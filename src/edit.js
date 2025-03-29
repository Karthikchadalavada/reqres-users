import React from "react";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./contextprovider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = ({ fname, lname, email, id, list, setList }) => {
    const { setShowEditModal, setEdited } = useContext(MyContext);
    const [showPopup, setShowPopup] = useState(false);
      const [emailError, setEmailError] = useState(false);
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [editedFName, setEditedFName] = useState(fname || "");
    const [editedLName, setEditedLName] = useState(lname || "");
    const [editedEmail, setEditedEmail] = useState(email || "");
    const [message, setMessage] = useState("");


    
    useEffect(() => {
      setEditedFName(fname || "");
      setEditedLName(lname || "");
      setEditedEmail(email || "");
    }, [fname, lname, email]);
  
    // User updating Function
    const updateUser = async (e) => {
      e.preventDefault();

    //Form validation
    if (!editedFName && !editedLName && !editedEmail) {
    setShowPopup(true);
      setMessage("Please enter First Name, Last Name and Email");
      setEmailError(true);
      setFirstnameError(true);
      setLastnameError(true);
    } else if (!editedFName) {
    setShowPopup(true);
      setMessage("Please enter First Name");
      setEmailError(false);
      setFirstnameError(true);
      setLastnameError(false);
    } else if (!editedLName) {
      setShowPopup(true);
      setMessage("Please enter Last Name");
      setEmailError(false);
      setFirstnameError(false);
      setLastnameError(true);
    }else if (!editedEmail) {
      setShowPopup(true);
      setMessage("Please enter Email");
      setEmailError(true);
      setFirstnameError(false);
      setLastnameError(false);
    }

    //PUT request to API
    if(editedFName && editedEmail&& editedLName){
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: editedFName,
            last_name: editedLName,
            email: editedEmail,
          }),
        });
  
        if (!response.ok) throw new Error("Failed to update user");
        const data = await response.json();
        console.log("User Updated:", data);
       
        toast.success("user updated successfully");
        setTimeout(() => {
          setList((prevList) =>
            prevList.map((user) =>
              user.id === id
                ? { ...user, first_name: editedFName, last_name: editedLName, email: editedEmail }
                : user
            )
          );
        }, 1500);
        setEdited(false);
        setShowEditModal({ isOpen: false, user: null });
      } catch (error) {
        toast.error("error updating user: " ,error.message);
      }
    }
 };
  
    return (
      <div className="edit-div">
        <div className="edit">
          <h2>Edit Details</h2>
        </div>
        <div className="input-div">
          <div className="input-subdiv">
            
            <div className={`input-container ${firstnameError ? "error-border" : ""}`}>
              <input type="text" value={editedFName} className="input-field" onChange={(e) => setEditedFName(e.target.value)} required />
              <label className={`floating-label ${editedFName ? "active" : ""} ${firstnameError ? "error-label" : ""}`}>First Name</label>
            </div>
            
            <div className={`input-container ${lastnameError ? "error-border" : ""}`}>
              <input type="text" value={editedLName} className="input-field" onChange={(e) => setEditedLName(e.target.value)} required />
              <label className={`floating-label ${editedLName ? "active" : ""} ${lastnameError ? "error-label" : ""}`}>Last Name</label>
            </div>
            <div className={`input-container ${emailError ? "error-border" : ""}`}>
              <input type="text" value={editedEmail} className="input-field" onChange={(e) => setEditedEmail(e.target.value)} required />
              <label className={`floating-label ${editedEmail ? "active" : ""} ${emailError ? "error-label" : ""}`}>Email</label>
            </div>
          </div>
        </div>
        <div className="btns-div">
          <button className="save-changebtn" onClick={updateUser}>
            Save Changes
          </button>
        </div>

      {/* Error message Pop-up box */}
        {showPopup && (
        <div className="popup-overlay">
          <div className="message-box">
            <p>{message}</p>
            <button className="error-back-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    );
  };
  
  export default Edit;
  