import React from 'react';

const UserAvatar = ({ profilePicture }) => {
    return (
        <img
            src={profilePicture || "/svgs/avatar.svg"}
            alt="User Avatar"
            className="h-12 w-12 border-2 border-gray-200 bg-gray-200 rounded-full object-cover"
            onError={(e) => {
                e.target.src = "/svgs/avatar.svg";
            }}
        />
    );
};

export default UserAvatar;
