import { rootApi } from "@service/rootApi";

export const statisticsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Thống kê tổng quan
    getOverviewStatistics: builder.query({
      query: ({ month, year }) => ({
        url: "/statistics/overview",
        method: "GET",
        params: { month, year },
      }),
    }),

    // Thống kê doanh thu theo tháng
    getMonthlyRevenue: builder.query({
      query: ({ year }) => ({
        url: "/statistics/monthly-revenue",
        method: "GET",
        params: { year },
      }),
    }),

    // Thống kê doanh thu theo năm
    getYearlyRevenue: builder.query({
      query: ({ startYear, endYear }) => ({
        url: "/statistics/yearly-revenue",
        method: "GET",
        params: { startYear, endYear },
      }),
    }),

    // // Thống kê số lượng user theo tháng
    // getUserStatistics: builder.query({
    //   query: ({ year }) => ({
    //     url: "admin/statistics/users",
    //     method: "GET",
    //     params: { year },
    //   }),
    // }),

    // Thống kê phim theo thể loại
    getMoviesByGenre: builder.query({
      query: () => ({
        url: "/statistics/movies-by-genre",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOverviewStatisticsQuery,
  useGetMonthlyRevenueQuery,
  useGetYearlyRevenueQuery,
  // useGetUserStatisticsQuery,
  useGetMoviesByGenreQuery,
} = statisticsApi;
