import React, { useState } from 'react';
import './Account.css'; // Make sure to create this file for styling


const Account = ( {theme} ) => {
   const [fullName, setFullName] = useState('John Doe');
   const [email, setEmail] = useState('johndoe@example.com');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');


   const handleSaveChanges = () => {
       // Handle saving changes (mock for now)
       console.log('Changes saved');
   };


   const handleCancel = () => {
       // Handle cancel (mock for now)
       console.log('Changes canceled');
   };


   const handleDeleteAccount = () => {
       // Handle delete account (mock for now)
       console.log('Account deleted');
   };


   return (
       <div className={`account-page ${theme}`}>
           <h1>My Account</h1>


           {/* Account Picture Section */}
           <div className="picture-section">
               <h2>Account Picture</h2>
               <img className="account-picture" src="path_to_account_picture.jpg" alt="Account" />
               <button className='picture-button'>Change Picture</button>
           </div>


           {/* Basic Information Section */}
           <div className="info-section">
               <h2>Basic Information</h2>
               <label>Full Name:</label>
               <input className="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              
              <label>Email:</label>
              <input className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
             
              <label>Phone Number:</label>
              <input className="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>


          {/* Password Management Section */}
          <div className="password-section">
              <h2>Password Management</h2>
              <label>Current Password:</label>
              <input className="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
             
              <label>New Password:</label>
              <input className="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
             
              <label>Confirm Password:</label>
              <input className="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>


          {/* Save/Cancel Buttons */}
          <div className="sc-section">
              <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>


          {/* Delete Account Section */}
          <div className="delete-section">
              <button className="delete-account" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
      </div>
  );
};

export default Account;