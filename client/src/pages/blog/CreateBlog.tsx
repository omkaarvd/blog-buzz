import axios from 'axios';
import { useState, FormEvent } from 'react';

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:1437/api/blogs',
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
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h3 className="mb-4 text-2xl font-bold">Create a Blog</h3>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full rounded-lg border border-gray-300 p-2"
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
            className="w-full rounded-lg border border-gray-300 p-2"
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

export default CreateBlog;
