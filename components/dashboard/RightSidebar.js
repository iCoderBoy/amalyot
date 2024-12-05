// RightSidebar.js
import React from "react";

const RightSidebar = ({ user }) => {
  return (
    <div className="w-full min-h-screen lg:w-1/4 bg-white shadow-lg p-6 border-l border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Info</h2>
      {user ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-500">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {user.phone || "N/A"}
            </p>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Ma’lumot yuklanmadi...</p>
      )}
    </div>
  );
};

export default RightSidebar;
