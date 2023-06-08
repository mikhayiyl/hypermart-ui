import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../../apiServices/userService';
import asyncErrors from '../../middleware/AsyncErrors';
import "./style.css";
import UpdateProfile from './Update';

function ProfilePage({ user }) {
    const [currentuser, setUser] = useState({});
    const [edit, editProfile] = useState(false);
    const history = useNavigate();
    const location = useLocation();


    useEffect(() => {

        const populateUser = asyncErrors(async () => {

            const { data } = await getUser(user._id);
            setUser(data);


        });

        populateUser();



    }, [user]);

    if (!user) return history('/login', { state: { from: location } });

    return (
        <div>
            <div className='profilePage'>
                <div className='profile_info'>
                    <h1>Welcome, {currentuser.username}!</h1>
                    <div className="profile-section">
                        <h2>Profile Information</h2>
                    </div>
                    <p>Name: {currentuser.username}</p>
                    <p>Email: {currentuser.email}</p>
                    <p>Address: {currentuser.address?.location}</p>
                    <p>Contact: {currentuser.address?.phone}</p>
                    <div className='profile-imageBox'>
                        <img src="/assets/images/berry.png" alt={currentuser.name} className='profile-image' />
                    </div>

                    {!edit && <button className='btn btn-success btn-sm m-1' onClick={() => editProfile(true)}>Edit Profile</button>}
                </div>
                <div>
                    {edit && <UpdateProfile user={currentuser} />}

                </div>
            </div>

        </div>
    );
}

export default ProfilePage;



