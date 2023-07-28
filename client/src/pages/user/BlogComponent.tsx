import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { BlogState } from '../../types';
import { useAppSelector } from '../../redux/Store';

const BlogComponent = ({ blog }: { blog: BlogState }) => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector<string>((state) => state.user.value._id);
  const isLiked = blog.likedBy.includes(currentUserId);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1437/api/blogs/${blog._id}`,
        {
          headers: {
            'x-access-token': localStorage.getItem('user'),
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${blog._id}`);
  };

  return (
    <li>
      <div className="flex flex-row items-center justify-between">
        <Link to={`/blog/${blog._id}`}>
          <h3 className="text-xl font-semibold text-gray-600">{blog.title}</h3>
        </Link>
        <div className="flex flex-row items-start gap-4">
          <button onClick={handleEdit}>
            <img src="/edit.svg" alt="edit" className="m-auto inline h-6" />
          </button>
          <button onClick={() => void handleDelete()}>
            <img src="/delete.svg" alt="delete" className="m-auto inline h-6" />
          </button>
        </div>
      </div>

      <Link to={`/blog/${blog._id}`}>
        <p className="text-gray-600">{blog.content.slice(0, 200)}...</p>
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
