import { videoVersionTypes } from "@consts/videoVersionTypes";
import EpisodeListForUser from "@components/user/movie/EpisodeListForUser";
import { Tabs } from "antd";
import "@styles/user/styles.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoVersionForSeriesMovie = ({ videoVersions, movieDetail }) => {
  const [activeTabKey, setActiveTabKey] = useState(null);
  const location = useLocation();
  const episodeId = location?.state?.episodeId;

  // Tải trước danh sách tập của tất cả các phiên bản
  useEffect(() => {
    const loadAllEpisodes = async () => {
      if (videoVersions && videoVersions.length > 0) {
        const episodes = {};

        for (const version of videoVersions) {
          try {
            const response = await fetch(
              `/api/episodes?videoVersionId=${version.id}`,
            );
            if (response.ok) {
              const data = await response.json();
              episodes[version.id] = data?.data?.result || [];
            }
          } catch (error) {
            console.error(
              `Error loading episodes for version ${version.id}:`,
              error,
            );
          }
        }

        // Tìm phiên bản chứa tập hiện tại
        if (episodeId) {
          for (const versionId in episodes) {
            if (
              episodes[versionId].some(
                (ep) => String(ep.id) === String(episodeId),
              )
            ) {
              setActiveTabKey(versionId);
              break;
            }
          }
        }

        // Nếu không tìm thấy hoặc không có episodeId, sử dụng tab đầu tiên
        if (!activeTabKey && videoVersions.length > 0) {
          setActiveTabKey(videoVersions[0].id);
        }
      }
    };

    loadAllEpisodes();
  }, [videoVersions, episodeId, setActiveTabKey]);

  const tabItems = videoVersions.map((videoVersion) => ({
    key: videoVersion.id,
    label: videoVersionTypes[videoVersion.videoType].label,
    children: (
      <EpisodeListForUser
        videoVersionId={videoVersion.id}
        movieDetail={movieDetail}
        currentEpisodeId={episodeId}
      />
    ),
  }));

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <Tabs
      type="card"
      items={tabItems}
      className="custom-tabs-user"
      activeKey={activeTabKey}
      onChange={handleTabChange}
    />
  );
};

export default VideoVersionForSeriesMovie;
