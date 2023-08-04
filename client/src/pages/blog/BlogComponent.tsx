import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { useAppSelector } from '../../redux/Store';
import { BlogState } from '../../types';

const BlogComponent = ({ blog }: { blog: BlogState }) => {
  const currentUserId = useAppSelector((state) => state.user.value._id);
  const [user, setUser] = useState<{ name: string; image: string }>();
  const isLiked = blog.likedBy.includes(currentUserId);
  const htmlString = blog.content;

  useEffect(() => {
    axios
      .get<{ name: string; image: string }>(
        `http://localhost:1437/api/user/${blog.createdBy}`
      )
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <li>
      <div className="mb-1 flex flex-row items-center justify-start gap-1">
        <img
          src={user?.image || '/user-profile.svg'}
          alt="user-profile"
          className="h-6 w-6 rounded-full object-cover"
        />
        <span className="text-sm text-gray-600">{user?.name}</span>
      </div>

      <Link to={`/blog/${blog._id}`}>
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <div className="text-gray-600">
          {parse(htmlString.slice(0, 300))}...
        </div>
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
