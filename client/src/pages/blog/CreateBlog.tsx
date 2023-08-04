import axios from 'axios';
import React, { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import QuillToolbar from '../../components/QuillToolbar';

const CreateBlog: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    console.log({ title, content });

    axios
      .post(
        'http://localhost:1437/api/blogs',
        { title, content },
        { headers: { 'x-access-token': localStorage.getItem('user') } }
      )
      .then(() => {
        window.location.href = '/';
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
          onClick={handleSubmit}
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
          ref={titleRef}
        />
      </div>
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        ref={contentRef}
        placeholder={'Write here...'}
        modules={modules}
        className="bg-[#fff]"
      />
    </div>
  );
};

export default CreateBlog;
