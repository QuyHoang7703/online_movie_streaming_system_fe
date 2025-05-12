import { Tag } from "antd";

const MovieTags = () => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Tag className="!text-blac !border-none !bg-mainUserColor-100 p-1 text-[0.8vw]">
        IMDb 5.7
      </Tag>
      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        T16
      </Tag>
      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        2025
      </Tag>

      <Tag className="!border-none !bg-gray-700 p-1 text-[0.8vw] !text-white">
        1h 46m
      </Tag>
    </div>
  );
};
export default MovieTags;
