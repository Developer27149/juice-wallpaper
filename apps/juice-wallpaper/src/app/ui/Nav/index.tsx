import Image from 'next/image';
import { getUserInfo } from '../../actions';
import AuthModal from '../AuthModal';
import AvatarMenu from './AvatarMenu';

export default async function Nav() {
  const userInfo = await getUserInfo();

  return (
    <nav className="flex mx-auto items-center w-[768px] max-screen py-4">
      <div className="nav__logo">
        <Image src={'/favicon.ico'} width={48} height={48} alt="logo" />
      </div>
      <div className="ml-auto">
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          {userInfo ? (
            <AvatarMenu avatar={userInfo.avatar} />
          ) : (
            <li>
              <AuthModal />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
