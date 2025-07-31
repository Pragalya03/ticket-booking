import React from 'react';
import './UserAccount.css';

function UserAccount({ user }) {
  return (
    <div className="user-account">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} className="profile-picture" />
        <div className="user-info">
          <h2 className="username">{user.username}</h2>
          <p className="user-email">{user.emailAddress}</p>
        </div>
      </div>
      <div className="user-details">
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
    </div>
  );
}

const exampleUser = {
  username: 'johndoe',
  phoneNumber: '(123) 456-7890',
  emailAddress: 'johndoe@example.com',
  address: '123 Main St, Anytown, USA',
  profilePicture: 'https://www.w3schools.com/w3images/avatar2.png' // Example image URL
};

export default function UserAccountWrapper() {
  return <UserAccount user={exampleUser} />;
}
