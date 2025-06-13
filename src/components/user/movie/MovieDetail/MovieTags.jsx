import { Tag } from "antd";

const MovieTags = ({
  rating,
  year,
  duration,
  type,
  quality,
  size = "0.9em",
}) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      {rating && rating > 0 && (
        <Tag
          className={`!border-none !bg-mainUserColor-100 p-1 text-[${size}] !text-black`}
        >
          IMDb {rating}
        </Tag>
      )}
      {type && (
        <Tag
          className={`!border-none !bg-gray-700 p-1 text-[${size}] !text-white`}
        >
          T{type}
        </Tag>
      )}
      {year && (
        <Tag
          className={`!border-none !bg-gray-700 p-1 text-[${size}] !text-white`}
        >
          {year}
        </Tag>
      )}
      {duration && (
        <Tag
          className={`!border-none !bg-gray-700 p-1 text-[${size}] !text-white`}
        >
          {duration}
        </Tag>
      )}
      {quality && (
        <Tag
          className={`!border-none !bg-gray-700 p-1 text-[${size}] !text-white`}
        >
          {quality}
        </Tag>
      )}
    </div>
  );
};
export default MovieTags;
