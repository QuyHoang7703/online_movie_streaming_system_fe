import { FilterFilled } from "@ant-design/icons";
import { COUNTRY_NAME_MAP } from "@consts/countryNameMap";
import { useGetCountriesQuery } from "@service/admin/countryApi";
import { useGetAllGenresQuery } from "@service/admin/genresApi";
import { useGetSubscriptionPlansForFilterQuery } from "@service/admin/subscriptionPlanApi";
import { Button } from "antd";
import { useSelector } from "react-redux";

const movieTypes = [
  { label: "Tất cả", value: "Tất cả" },
  { label: "Phim lẻ", value: "STANDALONE" },
  { label: "Phim bộ", value: "SERIES" },
];

const MovieFilter = ({
  selectedCountries,
  setSelectedCountries,
  selectedGenres,
  setSelectedGenres,
  selectedMovieType,
  setSelectedMovieType,
  isVisibleFilter,
  setIsVisibleFilter,
  selectedSubscriptionPlanId,
  setSelectedSubscriptionPlanId,
}) => {
  const countriesResponse = useGetCountriesQuery();
  const genresResponse = useGetAllGenresQuery();
  const subscriptionPlansResponse = useGetSubscriptionPlansForFilterQuery();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleFilterClick = () => {
    setIsVisibleFilter((prev) => !prev);
  };

  const handleCountryClick = (country) => {
    if (country === "Tất cả") {
      setSelectedCountries(["Tất cả"]);
    } else {
      setSelectedCountries((prev) => {
        const filtered = prev.filter((c) => c !== "Tất cả");
        if (prev.includes(country)) {
          // Bỏ chọn genre
          const next = filtered.filter((c) => c !== country);
          return next.length === 0 ? ["Tất cả"] : next;
        } else {
          // Thêm genre
          return [...filtered, country];
        }
      });
    }
  };

  const handleMovieTypeClick = (movieType) => {
    setSelectedMovieType(movieType);
  };

  const handleGenreClick = (genreName) => {
    if (genreName === "Tất cả") {
      setSelectedGenres(["Tất cả"]);
    } else {
      setSelectedGenres((prev) => {
        const filtered = prev.filter((g) => g !== "Tất cả");
        if (prev.includes(genreName)) {
          // Bỏ chọn genre
          const next = filtered.filter((g) => g !== genreName);
          return next.length === 0 ? ["Tất cả"] : next;
        } else {
          // Thêm genre
          return [...filtered, genreName];
        }
      });
    }
  };

  const handleSubscriptionPlanClick = (subscriptionPlanId) => {
    setSelectedSubscriptionPlanId(subscriptionPlanId);
  };

  return (
    <div className="">
      <div
        className="text-md mb-2 flex w-fit cursor-pointer items-center gap-2 rounded-md p-3 font-bold text-slate-100 transition hover:bg-[#22304a]"
        onClick={handleFilterClick}
      >
        <FilterFilled className="text-md text-[#f9d373]" />
        <span>Bộ lọc</span>
      </div>
      <div>
        {isVisibleFilter && (
          <div className="rounded-md border-[1px] border-slate-700 pb-5">
            <div className="ml-10 flex items-center gap-4 p-5">
              <div className="flex items-start gap-4">
                <div className="min-w-[90px] pt-2 font-semibold text-slate-100">
                  Quốc gia:
                </div>
                <div className="flex flex-wrap gap-3 text-slate-300">
                  {[
                    { id: "", name: "Tất cả" },
                    ...(countriesResponse?.data?.data || []),
                  ].map((country) => (
                    <div
                      key={country.id}
                      onClick={() => handleCountryClick(country.name)}
                      className={`cursor-pointer rounded p-2 transition ${
                        selectedCountries.includes(country.name)
                          ? "border-[0.5px] border-slate-500 bg-[#112233] text-[#f9d373]"
                          : "hover:text-[#f9d373]"
                      }`}
                    >
                      {COUNTRY_NAME_MAP[country.name] || country.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ml-10 flex items-center gap-4 p-5">
              <div className="min-w-[90px] font-semibold text-slate-100">
                Loại phim:
              </div>
              <div className="flex flex-wrap gap-5 text-slate-300">
                {movieTypes.map((movieType) => (
                  <div
                    key={movieType.value}
                    onClick={() => handleMovieTypeClick(movieType.value)}
                    className={`cursor-pointer rounded p-2 transition ${
                      movieType.value === selectedMovieType
                        ? "border-[0.5px] border-slate-500 bg-[#112233] text-[#f9d373]"
                        : "hover:text-[#f9d373]"
                    }`}
                  >
                    {movieType.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-10 flex items-center gap-4 p-5">
              <div className="flex items-start gap-4">
                <div className="min-w-[90px] pt-2 font-semibold text-slate-100">
                  Thể loại
                </div>
                <div className="flex flex-wrap gap-3 text-slate-300">
                  {[
                    { id: "", name: "Tất cả" },
                    ...(genresResponse?.data?.data || []),
                  ].map((genre) => (
                    <div
                      key={genre.id}
                      onClick={() => handleGenreClick(genre.name)}
                      className={`cursor-pointer rounded p-2 transition ${
                        selectedGenres.includes(genre.name)
                          ? "border-[0.5px] border-slate-500 bg-[#112233] text-[#f9d373]"
                          : "hover:text-[#f9d373]"
                      }`}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {userInfo?.role === "ADMIN" && (
              <div className="ml-10 flex items-center gap-4 p-5">
                <div className="flex items-start gap-4">
                  <div className="min-w-[90px] pt-2 font-semibold text-slate-100">
                    Gói đăng ký
                  </div>
                  <div className="flex flex-wrap gap-3 text-slate-300">
                    {(subscriptionPlansResponse?.data?.data || []).map(
                      (subscriptionPlan) => (
                        <div
                          key={subscriptionPlan.id}
                          onClick={() =>
                            handleSubscriptionPlanClick(subscriptionPlan.id)
                          }
                          className={`cursor-pointer rounded p-2 transition ${
                            selectedSubscriptionPlanId === subscriptionPlan.id
                              ? "border-[0.5px] border-slate-500 bg-[#112233] text-[#f9d373]"
                              : "hover:text-[#f9d373]"
                          }`}
                        >
                          {subscriptionPlan.name}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* <div className="ml-10 flex items-center gap-4">
              <Button
                className="!bg-mainUserColor-100 p-3 font-semibold text-black hover:bg-mainUserColor-100 hover:!text-gray-800"
                size="medium"
              >
                Lọc kết quả
              </Button>
              <Button
                className="!border-white !bg-dark-100 p-3 font-semibold text-white hover:!bg-dark-100/80 hover:!text-gray-200"
                onClick={() => {
                  setIsVisibleFilter(!isVisibleFilter);
                }}
                size="medium"
              >
                Đóng
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieFilter;
