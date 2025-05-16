import ImageWithPlaceholder from "@components/common/ImageWithPlaceholder ";
import { useLoading } from "@context/LoadingContext";
import { useGetActorsQuery } from "@service/admin/actorApi";
import { Image, Pagination } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ActorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageNumber: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("size")) || 32,
  });

  const params = useMemo(() => {
    const filteredParams = {
      page: pagination.pageNumber,
      size: pagination.pageSize,
    };

    return filteredParams;
  }, [pagination]);

  const actorsResponse = useGetActorsQuery(params);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (actorsResponse.isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [actorsResponse, showLoading, hideLoading]);

  const handlePageChange = (page, pageSize) => {
    setPagination({
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  const actors = actorsResponse?.data?.data?.result || [];
  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <p className="mb-3 text-2xl font-medium text-white">Diễn viên</p>
      {actors !== undefined && actors.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {(actorsResponse?.data?.data?.result || []).map((actor) => (
              <Link
                to={`/dien-vien/${actor.id}`}
                key={actor.actorId}
                className="relative hover:brightness-75"
              >
                <ImageWithPlaceholder
                  src={actor.avatarUrl}
                  alt={actor.actorName}
                  preview={false}
                  className="aspect-[3/4] rounded-xl object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-2 py-2 text-center">
                  <p className="text-center font-bold text-white">
                    {actor.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              current={pagination.pageNumber}
              pageSize={pagination.pageSize}
              total={actorsResponse?.data?.data?.meta?.totalElements}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              className="custom-pagination"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ActorsPage;
