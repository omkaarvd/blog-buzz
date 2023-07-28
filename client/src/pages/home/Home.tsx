import axios from 'axios';
import { useEffect, useState } from 'react';

import Loader from '../../components/Loader';
import { BlogState } from '../../types';
import BlogComponent from '../blog/BlogComponent';

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogState[]>([] as BlogState[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<BlogState[]>('http://localhost:1437/api/blogs')
      .then(({ data }) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-4xl pb-4 pt-8">
      {loading && (
        <div className="flex flex-row justify-center">
          <Loader />
        </div>
      )}
      {blogs.length === 0 && !loading && (
        <div className="flex flex-row justify-center">
          <p className="text-lg font-bold text-gray-700">No blogs found</p>
        </div>
      )}
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <BlogComponent key={blog._id} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
