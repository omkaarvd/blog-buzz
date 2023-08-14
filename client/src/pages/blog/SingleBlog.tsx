import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import RenderComments from './RenderComments';
import NotFound from '../error/NotFound';
import { useAppSelector } from '../../redux/Store';
import { BlogState, CommentState } from '../../types/types';

const SingleBlog: React.FC = () => {
  const { id } = useParams() as { id: string };
  const userId = useAppSelector((state) => state.user.value._id);

  const [error, setError] = useState(false);
  const [blog, setBlog] = useState<BlogState>({} as BlogState);
  const [likeStatus, setLikeStatus] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentState[]>([]);
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    axios
      .get<BlogState>(`http://localhost:1437/api/blogs/${id}`)
      .then(({ data }) => {
        setBlog(data);
        setHtmlString(data.content);
        setLikeStatus(data.likedBy.includes(userId));
        setComments(data.comments);
      })
      .catch((err: Error) => {
        setError(true);
        console.log(err.message);
      });
  }, []);

  const handleLikes = () => {
    if (likeStatus === false) {
      blog.likes += 1;

      axios
        .patch(
          `http://localhost:1437/api/blogs/${id}`,
          { likes: blog.likes },
          { headers: { 'x-access-token': localStorage.getItem('user') } }
        )
        .then(() => {
          setLikeStatus(true);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      commentedBy: userId,
      comment: commentText,
    };

    axios
      .patch<CommentState>(
        `http://localhost:1437/api/blogs/${id}`,
        { comment: newComment },
        { headers: { 'x-access-token': localStorage.getItem('user') } }
      )
      .then((response) => {
        setComments([...comments, response.data]);
        setCommentText('');
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='mx-auto max-w-4xl pb-4 pt-8'>
      {error ? (
        <NotFound />
      ) : (
        <>
          <div className='mb-4 flex flex-row items-center justify-between'>
            <div>
              <h2 className='border-l-8 border-[#1aac83] pl-1 text-2xl font-bold'>
                {blog.title}
              </h2>
              <span className='text-sm text-gray-600'>
                {`Updated ${new Date(blog.updatedAt).toLocaleDateString()}`}
              </span>
            </div>

            <div className='flex flex-row items-center gap-6'>
              {typeof comments.length === 'number' && (
                <div className='flex flex-row items-start gap-2'>
                  <img
                    src='/comment.svg'
                    alt='delete'
                    className='m-auto inline h-6'
                  />
                  <span className='text-lg'>{comments.length}</span>
                </div>
              )}

              <div className='flex flex-row items-start gap-2'>
                <button onClick={handleLikes}>
                  <img
                    src={likeStatus ? '/like-filled.svg' : '/like.svg'}
                    alt='delete'
                    className='m-auto inline h-6'
                  />
                </button>
                <span className='text-lg'>{blog.likes}</span>
              </div>
            </div>
          </div>
          <div
            className='mb-4'
            // dangerouslySetInnerHTML={{ __html: blog.content }}
          >
            {parse(htmlString)}
          </div>
          <div className='mt-6'>
            <h3 className='mb-2 text-xl font-semibold'>Comments</h3>
            {/* Comment Input */}
            <div className='mb-6'>
              <form onSubmit={handleComment}>
                <input
                  type='text'
                  placeholder='Add your comment...'
                  value={commentText}
                  required
                  onChange={(e) => setCommentText(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 p-2'
                />
                <button
                  type='submit'
                  className='mt-2 rounded-lg bg-[#1aac83] px-4 py-2 text-white'
                >
                  Post Comment
                </button>
              </form>
            </div>
            <section>
              {comments.map((comment) => (
                <RenderComments comment={comment} key={comment._id} />
              ))}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
