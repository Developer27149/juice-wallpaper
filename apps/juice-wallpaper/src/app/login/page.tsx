'use client';

import LoginForm from './components/LoginForm';

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold pt-12">Login to your Account</h1>
      <p className="opacity-50 my-6">
        It's time to find the next great wallpaper for your electronic screens
      </p>
      <div className="flex flex-col gap-4 items-center">
        <div className="w-[400px] border rounded-md p-4">
          <LoginForm />
        </div>
        <span className="before:mr-4 after:ml-4 before:content after:w-8 after:h-[1px] after:bg-gray-500/20 after:inline-block before:w-8 before:h-[1px] before:bg-gray-500/20 before:inline-block before:relative after:relative before:bottom-1 after:bottom-1">
          or
        </span>
        <div className="flex gap-4 p-2 rounded-sm">
          <a
            href="#"
            className="p-[2px] hover:scale-110 origin-center transition-transform from-green-400 to-yellow-300 bg-gradient-to-br  rounded-[4px] shadow-sm"
          >
            <div className="flex items-center gap-2 p-2 px-2 rounded-sm bg-white">
              <i className="i-logos-google-icon"></i>
              <span>Google</span>
            </div>
          </a>

          <div className="p-[2px] hover:scale-110 origin-center transition-transform from-yellow-300 to-green-100 bg-gradient-to-br rounded-[4px]">
            <a
              href="#"
              className="bg-white text-gray-900 flex items-center gap-2 p-2 px-2 rounded-sm"
            >
              <i className="i-logos-github-icon"></i>
              <span>Github</span>
            </a>
          </div>

          <div className="p-[2px] hover:scale-110 origin-center transition-transform from-green-400 to-yellow-300 bg-gradient-to-br rounded-[4px]">
            <a
              href="#"
              className="bg-white text-gray-900 flex items-center gap-2 p-2 px-2 rounded-sm"
            >
              <i className="i-logos-apple"></i>
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
