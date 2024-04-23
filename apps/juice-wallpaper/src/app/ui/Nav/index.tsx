import { getUserInfo } from '../../actions';
import AuthModal from '../AuthModal';
import AvatarMenu from './AvatarMenu';

export default async function Nav() {
  const userInfo = await getUserInfo();

  return (
    <nav className="flex mx-auto items-center w-[1200px] max-w-screen py-4">
      <div className="font-semibold text-2xl">Juice Wallpaper</div>
      <div className="ml-auto">
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="active">
              Top 20
            </a>
          </li>
          <li>
            <a href="#">Share Flow</a>
          </li>
          <li className="mr-8">
            <a href="#">Blog</a>
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
