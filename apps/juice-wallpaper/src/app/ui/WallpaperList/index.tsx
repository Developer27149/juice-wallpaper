import Image from 'next/image';
import { getWallpapers } from '../../actions';
import AddNew from './Action';
import DeleteButton from './DeleteButton';

export default async function WallpaperList() {
  const wallpapers = await getWallpapers();
  console.log(wallpapers);

  return (
    <div className="wallpaper-list my-8 p-2 rounded-sm">
      <ul className="flex flex-col gap-2 mb-4 list-disc ml-4">
        {wallpapers.map(({ description, urls, id, alt_description }) => (
          <li key={id} className="flex gap-2 items-center">
            <div className="relative">
              <DeleteButton id={id} className="absolute top-2 right-2" />
              <Image
                src={urls.regular}
                alt={alt_description}
                width={600}
                height={100}
                className="max-h-[240px]"
              />
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gray-900/20 text-white truncate px-2">
                {description ?? alt_description}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <AddNew />
    </div>
  );
}
