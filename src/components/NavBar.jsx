import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">🧑‍💻DevTInder</span>
      </div>

      {user && (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />

          <div>Welcome, {user.firstName}</div>

          <div className="dropdown dropdown-end relative">
            <button
              type="button"
              className="btn btn-ghost btn-circle avatar"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="user photo" src={user.photoUrl} draggable={false} />
              </div>
            </button>

            <ul
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              role="menu"
            >
              <li>
                <button type="button" role="menuitem">
                  Profile <span className="badge">New</span>
                </button>
              </li>
              <li>
                <button type="button" role="menuitem">
                  Settings
                </button>
              </li>
              <li>
                <button type="button" role="menuitem">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
