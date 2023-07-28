import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { AuthState, BlogState } from '../../types';
import { useAppSelector } from '../../redux/Store';
import BlogComponent from './BlogComponent';

const Profile: React.FC = () => {
  const user = useAppSelector<AuthState>((state) => state.user.value);
  const [blogs, setBlogs] = useState<BlogState[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);

  useEffect(() => {
    axios
      .get<BlogState[]>(`http://localhost:1437/api/blogs/user/${user._id}`, {
        headers: {
          'x-access-token': localStorage.getItem('user'),
        },
      })
      .then(({ data }) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveEditedProfile = () => {
    axios
      .patch(`http://localhost:1437/api/user/${user._id}`, { name })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUserAccount = () => {
    axios
      .delete(`http://localhost:1437/api/user/${user._id}`)
      .then(() => {
        localStorage.removeItem('user');
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-2">
          <img src="/user-profile.svg" alt="profile" className="h-20" />
          {isEditing ? (
            <span>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-[#ddd] p-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-lg text-gray-600">{user.email}</p>
            </span>
          ) : (
            <span>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-lg text-gray-600">{user.email}</p>
            </span>
          )}
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-[#0f9b7a]"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={saveEditedProfile}
            className="rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-[#0f9b7a]"
          >
            Save
          </button>
        )}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-bold">Your Blogs</h3>
        {blogs.length === 0 ? (
          <p>No blogs created yet.</p>
        ) : (
          <ul>
            {blogs.map((blog) => (
              <BlogComponent blog={blog} key={blog._id} />
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-600">Danger Zone</h3>
        <button
          onClick={deleteUserAccount}
          className="mb-4 mt-2 rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
