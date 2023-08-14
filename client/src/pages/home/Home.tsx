import axios from 'axios';
import { useEffect, useState } from 'react';
import { BlogState } from '../../types/types';
import BlogComponent from '../blog/BlogComponent';

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogState[]>([] as BlogState[]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<BlogState[]>('http://localhost:1437/api/blogs', {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setBlogs(data);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='mx-auto max-w-4xl pb-4 pt-8'>
      {blogs.length === 0 && (
        <div className='flex flex-row justify-center'>
          <p className='text-lg font-bold text-gray-700'>No blogs found</p>
        </div>
      )}
      <ul className='space-y-4'>
        {blogs.map((blog) => (
          <BlogComponent key={blog._id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
