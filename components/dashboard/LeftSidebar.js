import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const LeftSidebar = ({ user }) => {
  return (
    <div className="w-1/4 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-6 flex flex-col">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        {user ? (
          <>
            <div className="relative w-24 h-24">
              <img
                src={user.image || "https://via.placeholder.com/150"}
                alt="User"
                className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-blue-200 mt-1">
              {user.email || "Email mavjud emas"}
            </p>
          </>
        ) : (
          <p>Ma’lumot yuklanmadi...</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21H3M21 21h-6M21 10h-6"
                />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6h4m-2 2v8m-6 4h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z"
                />
              </svg>
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-red-600 transition-all"
              onClick={() => signOut(auth)}
            >
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-11V4"
                />
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <footer className="mt-auto text-center text-sm text-blue-200">
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </footer>
    </div>
  );
};

export default LeftSidebar;
