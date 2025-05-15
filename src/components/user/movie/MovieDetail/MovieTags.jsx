import { Tag } from "antd";

const MovieTags = ({ rating, year, duration, type, quality }) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Tag className="!text-blac !border-none !bg-mainUserColor-100 p-1 text-[0.8vw]">
        IMDb {rating}
      </Tag>
      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        T{type}
      </Tag>
      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        {year}
      </Tag>

      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        {duration}
      </Tag>
      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        {quality}
      </Tag>
    </div>
  );
};
export default MovieTags;
