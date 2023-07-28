import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch, useAppSelector } from '../redux/Store';
import { logOut } from '../redux/slice/UserSlice';

export const DropDown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.user.value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
    window.location.reload();
  };

  window.onclick = (event) => {
    if (event.target === document.querySelector('#dropdown-icon')) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <button>
        <img
          src="/user-profile.svg"
          alt="user-profile"
          className="m-auto h-9"
          id="dropdown-icon"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-5 top-16 z-20 mt-2 w-40 rounded-md bg-white py-2 shadow-xl">
          <Link to={`/user/${user._id}`}>
            <button className="block w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-[#f1f1f1]">
              {user.name}
            </button>
          </Link>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f1f1f1]"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};
