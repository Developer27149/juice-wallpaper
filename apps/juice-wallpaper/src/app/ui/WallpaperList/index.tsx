import { getWallpapers } from '../../actions';
import AddNew from './Action';
import DeleteButton from './DeleteButton';

export default async function WallpaperList() {
  const wallpapers = await getWallpapers();
  return (
    <div className="wallpaper-list my-8 p-2 rounded-sm">
      <ul className="flex flex-col gap-2 mb-4 list-disc ml-4">
        {wallpapers.map(({ name, id }) => (
          <li key={id} className="flex gap-2 items-center">
            {name}
            <DeleteButton id={id} />
          </li>
        ))}
      </ul>
      <AddNew />
    </div>
  );
}
