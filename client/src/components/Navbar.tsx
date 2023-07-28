import { Link } from 'react-router-dom';

import { DropDown } from './DropDown';
import { useAppSelector } from '../redux/Store';

const Navbar: React.FC = () => {
  const isAuth = useAppSelector((state) => state.user.value.isAuthorized);

  return (
    <nav>
      <div className="flex items-center justify-between bg-[#fff] px-5 py-3">
        <Link to="/">
          <h1 className="my-5 text-3xl font-bold text-[#333]">Blogging Buzz</h1>
        </Link>
        {isAuth ? (
          <div className="flex flex-row items-center justify-between gap-4">
            <Link to="/blog/create">
              <img src="/write.svg" alt="write" className="m-auto inline h-8" />
            </Link>
            <DropDown />
          </div>
        ) : (
          <div>
            <Link to="/user/login">
              <button className="ml-2 rounded-md border-none  bg-[#1aac83] p-2 text-[#fff] hover:bg-[#0f9b7a]">
                Login
              </button>
            </Link>
            <Link to="/user/signup">
              <button className="ml-2 rounded-md border-none bg-[#1aac83]  p-2 text-[#fff] hover:bg-[#0f9b7a]">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
