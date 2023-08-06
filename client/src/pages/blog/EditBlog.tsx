import axios from 'axios';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { BlogState } from '../../types';
import QuillToolbar from '../../components/QuillToolbar';
import { modules } from '../../components/QuillModules';

const EditBlog: React.FC = () => {
  const { id } = useParams() as { id: string };
  const contentRef = useRef<ReactQuill>(null);

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
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [id]);

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:1437/api/blogs/${id}`,
        {
          title,
          content: contentRef.current?.value,
        },
        { headers: { 'x-access-token': localStorage.getItem('user') } }
      )
      .then(() => {
        window.location.href = `/user/${userId}}`;
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">Create a Blog</h3>
        <button
          onClick={handleEdit}
          className="rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-[#0f9b7a]"
        >
          Post
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="w-full border border-gray-300 p-1 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        ref={contentRef}
        modules={modules}
        value={content}
        className="bg-[#fff]"
      />
    </div>
  );
};

export default EditBlog;
