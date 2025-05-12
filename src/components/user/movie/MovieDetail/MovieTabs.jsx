import { Tabs } from "antd";

const items = [
  {
    key: "1",
    label: "Tập phim",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Diễn viên",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Đề xuất",
    children: "Content of Tab Pane 3",
  },
];

const MovieTabs = () => {
  return (
    <div>
      <Tabs items={items} className="custom-tabs text-[1.3vw] text-white" />
    </div>
  );
};

export default MovieTabs;
