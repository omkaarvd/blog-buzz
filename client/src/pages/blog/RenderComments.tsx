import axios from 'axios';
import { useEffect, useState } from 'react';
import { CommentState } from '../../types/types';

const RenderComment = ({ comment }: { comment: CommentState }) => {
  const [commentedBy, setCommentedBy] = useState<string>(comment.commentedBy);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<{ name: string; image: string }>(
        `http://localhost:1437/api/user/${comment.commentedBy}`,
        {
          signal: controller.signal,
        }
      )
      .then(({ data }) => {
        setCommentedBy(data.name);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='mb-2 rounded-lg bg-white p-4 shadow-md'>
      <p className='text-gray-700'>{comment.comment}</p>
      <span className='text-sm text-gray-500'>by {commentedBy}</span>
    </div>
  );
};

export default RenderComment;
