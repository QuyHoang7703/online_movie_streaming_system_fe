import MovieCard from "@components/user/movie/MovieCard";
import { useLoading } from "@context/LoadingContext";

import { useGetHistoryViewQuery } from "@service/userInteractionApi";
import { Empty, Pagination } from "antd";
import { useEffect, useState } from "react";

const HistoryView = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    size: 20,
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({
      page,
      size: pageSize,
    });
  };

  const { showLoading, hideLoading } = useLoading();

  const { data: historyViewResponse, isLoading } = useGetHistoryViewQuery({
    page: pagination.page,
    size: pagination.size,
  });

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  const historyView = historyViewResponse?.data?.result || [];
  if (historyView.length > 0) {
    console.log({ historyView_length: historyView.length });
  }

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-white">Yêu thích</p>
      <div>
        {Array.isArray(historyView) && historyView.length === 0 ? (
          <Empty
            description={
              <p className="text-lg font-bold text-white">
                Chưa có phim yêu thích
              </p>
            }
            className="!text-white"
          />
        ) : (
          <div className="">
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
              {historyView.map((movie) => (
                <MovieCard
                  key={movie.movieId}
                  movie={movie}
                  variant="default"
                />
              ))}
            </div>
            <div className="mt-7 flex justify-end">
              <Pagination
                current={pagination.page}
                pageSize={pagination.size}
                total={historyViewResponse?.data?.meta?.totalElements || 0}
                onChange={handlePageChange}
                // showSizeChanger
                // showQuickJumper
                className="custom-pagination"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
