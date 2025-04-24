import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieTypeModal = () => {
  const [movieType, setMovieType] = useState("");
  const navigate = useNavigate();
  const handleMovieTypeSelection = (type) => {
    setMovieType(type);
    navigate(`/admin/movies/create?type=${type}`);
  };

  return (
    <div>
      <div flex className="flex flex-col gap-4">
        <Button
          type="primary"
          className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
          onClick={() => handleMovieTypeSelection("series")}
        >
          Phim bộ
        </Button>
        <Button
          type="primary"
          className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
          onClick={() => handleMovieTypeSelection("standalone")}
        >
          Phim lẻ
        </Button>
      </div>
    </div>
  );
};
export default MovieTypeModal;
