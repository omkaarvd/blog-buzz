import axios from 'axios';
import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlogState } from '../../types';

const EditBlog: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios
      .get<BlogState>(`http://localhost:1437/api/blogs/${id}`)
      .then(({ data }) => {
        setTitle(data.title);
        setContent(data.content);
        setUserId(data.createdBy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:1437/api/blogs/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('user'),
          },
        }
      );

      if (response.status === 200) {
        window.location.href = `/user/${userId}}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h3 className="mb-4 text-2xl font-bold">Create a Blog</h3>
      <form onSubmit={(e) => void handleEdit(e)}>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full rounded-md border border-gray-300 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 text-lg font-semibold">
            Content
          </label>
          <textarea
            id="content"
            required
            className="w-full rounded-md border border-gray-300 p-2"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-[#0f9b7a]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
