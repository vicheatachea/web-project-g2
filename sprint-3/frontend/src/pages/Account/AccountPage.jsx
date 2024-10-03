import React, {useState} from 'react'
import accountPicture from "../../images/the-rock.jpg";
import styles from "./AccountPage.module.css";

function AccountPage({theme}) {
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /*  the code for handling change and upload
    const [image, setImage] = useState(null);
     const [preview, setPreview] = useState(null);

      // Handle image selection
      const handleImageChange = (e) => {
          const file = e.target.files[0];
          setImage(file);
          setPreview(URL.createObjectURL(file)); // Show image preview
      };

      // Handle image upload
      const handleImageUpload = async () => {
          const formData = new FormData();
          formData.append('profileImage', image);

          try {
              const response = await axios.post('/api/upload-profile-image', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              // Handle success response, for example, update the profile picture
              console.log('Image uploaded:', response.data.imageUrl);
          } catch (error) {
              console.error('Error uploading image:', error);
          }
      }; */


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

    const accountProfile = accountPicture


    return (
        <section className={`${styles.accountPage} account-page ${theme}`}>
            <h1>My Account</h1>


            {/* Account Picture Section */}
            <div className={styles.pictureSection}>
                <h2>Account Picture</h2>
                <img className={styles.accountPicture} src={accountProfile} alt="Account"/>

            </div>
            {/*  the real return call for changing account profile
          <div className={styles.pictureSection}>
            <h2>Account Picture</h2>
            <img className={styles.accountPicture} src={preview || '/images/default.jpg'} alt="Account" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button className={styles.pictureButton} onClick={handleImageUpload}>Change Picture</button>
            </div> */}


            {/* Basic Information Section */}
            <div className={styles.infoSection}>
                <h2>Basic Information</h2>
                <label>Name:</label>
                <input className={styles.text} value={fullName} onChange={(e) => setFullName(e.target.value)}/>

                <label>Email:</label>
                <input className={styles.email} value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label>Phone Number:</label>
                <input className={styles.text} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>


            {/* Password Management Section */}
            <div className={styles.passwordSection}>
                <h2>Password Management</h2>
                <label>Current Password:</label>
                <input className={styles.password} value={currentPassword}
                       onChange={(e) => setCurrentPassword(e.target.value)}/>

                <label>New Password:</label>
                <input className={styles.password} value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}/>

                <label>Confirm Password:</label>
                <input className={styles.password} value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>


            {/* Save/Cancel Buttons */}
            <div className={styles.saveCancelSection}>
                <button className={styles.saveButton} onClick={handleSaveChanges}>Save Changes</button>
                <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            </div>


            {/* Delete Account Section */}
            <div className={styles.deleteSection}>
                <button className={styles.deleteAccount} onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </section>
    );
}

export default AccountPage
