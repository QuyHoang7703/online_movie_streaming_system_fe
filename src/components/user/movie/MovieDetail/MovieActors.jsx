import { Image } from "antd";

const MovieActors = () => {
  return (
    <div className="mt-14">
      <p className="mb-3 text-2xl font-bold text-white">Diễn viên</p>
      <div className="grid grid-cols-3 gap-9 p-5">
        <div>
          <Image
            src="https://image.tmdb.org/t/p/w500/alHcDyLYbc6C2X9yOHw8mNHZVGu.jpg"
            alt="avatarUrl"
            width={90}
            height={90}
            // preview={false}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
          <p className="mt-2 text-white hover:text-mainColor">
            <a href="">Ha Jung-woo</a>
          </p>
        </div>
        <div>
          <Image
            src="https://image.tmdb.org/t/p/w500/alHcDyLYbc6C2X9yOHw8mNHZVGu.jpg"
            alt="avatarUrl"
            width={90}
            height={90}
            // preview={false}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
          <p className="mt-2 text-white hover:text-mainColor">
            <a href="">Ha Jung-woo</a>
          </p>
        </div>
        <div>
          <Image
            src="https://image.tmdb.org/t/p/w500/alHcDyLYbc6C2X9yOHw8mNHZVGu.jpg"
            alt="avatarUrl"
            width={90}
            height={90}
            // preview={false}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
          <p className="mt-2 text-white hover:text-mainColor">
            <a href="">Ha Jung-woo</a>
          </p>
        </div>

        <div>
          <Image
            src="https://image.tmdb.org/t/p/w500/alHcDyLYbc6C2X9yOHw8mNHZVGu.jpg"
            alt="avatarUrl"
            width={90}
            height={90}
            // preview={false}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
          <p className="mt-2 text-white hover:text-mainColor">
            <a href="">Ha Jung-woo</a>
          </p>
        </div>
        <div>
          <Image
            src="https://image.tmdb.org/t/p/w500/alHcDyLYbc6C2X9yOHw8mNHZVGu.jpg"
            alt="avatarUrl"
            width={90}
            height={90}
            // preview={false}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
          <p className="mt-2 text-white hover:text-mainColor">
            <a href="">Ha Jung-woo</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieActors;
