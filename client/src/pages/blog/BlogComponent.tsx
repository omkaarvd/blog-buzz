import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/Store';
import { BlogState } from '../../types';

const BlogComponent = ({ blog }: { blog: BlogState }) => {
  const currentUserId = useAppSelector((state) => state.user.value._id);
  const [user, setUser] = useState<string>('');
  const isLiked = blog.likedBy.includes(currentUserId);

  useEffect(() => {
    axios
      .get<string>(`http://localhost:1437/api/user/${blog.createdBy}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <li>
      <div className="mb-1 flex flex-row items-center justify-start gap-1">
        <img src="/user-profile.svg" alt="user-profile" />
        <span className="text-sm text-gray-600">{user}</span>
      </div>

      <Link to={`/blog/${blog._id}`}>
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-700">{blog.content.slice(0, 200)}...</p>
      </Link>

      <div className="mt-2 flex flex-row items-center justify-start gap-6">
        <div className="text-sm text-gray-600">
          {`Updated ${new Date(blog.updatedAt).toLocaleDateString()}`}
        </div>
        <span className="flex flex-row items-start gap-1">
          <img
            src={isLiked ? '/like-filled.svg' : '/like.svg'}
            alt="like"
            className="h-4"
          />
          <span className="text-sm text-gray-600">{blog.likes}</span>
        </span>
      </div>
      <hr className="mb-6 mt-4 h-px border-0 bg-gray-200" />
    </li>
  );
};

export default BlogComponent;
