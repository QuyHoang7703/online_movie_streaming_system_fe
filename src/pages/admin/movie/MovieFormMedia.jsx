import React, { useState } from "react";
import { Select, Input, Button, Table } from "antd";

const actorOptions = [
  { label: "Ngô Thanh Vân", value: "ngo-thanh-van" },
  { label: "Trấn Thành", value: "tran-thanh" },
  { label: "Lý Hải", value: "ly-hai" },
  { label: "Thu Trang", value: "thu-trang" },
  { label: "Kiều Minh Tuấn", value: "kieu-minh-tuan" },
];

const MovieFormMedia = () => {
  const [selectedActor, setSelectedActor] = useState(null);
  const [role, setRole] = useState("");
  const [castList, setCastList] = useState([]);

  const handleAddCast = () => {
    if (selectedActor && role) {
      setCastList([...castList, { actor: selectedActor, role }]);
      setSelectedActor(null);
      setRole("");
    }
  };

  const handleRemoveCast = (index) => {
    setCastList(castList.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-dark-200 p-8">
      <h2 className="mb-4 text-xl font-bold text-white">
        Thêm diễn viên & vai diễn
      </h2>
      <div className="mb-3 flex gap-3">
        <Select
          showSearch
          placeholder="Chọn diễn viên"
          options={actorOptions}
          value={selectedActor}
          onChange={setSelectedActor}
          className="w-1/3"
        />
        <Input
          placeholder="Nhập vai diễn"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-1/3"
        />
        <Button type="primary" onClick={handleAddCast}>
          Thêm
        </Button>
      </div>
      <Table
        dataSource={castList}
        columns={[
          { title: "Diễn viên", dataIndex: "actor", key: "actor" },
          { title: "Vai diễn", dataIndex: "role", key: "role" },
          {
            title: "Xóa",
            key: "action",
            render: (_, __, idx) => (
              <Button danger onClick={() => handleRemoveCast(idx)}>
                Xóa
              </Button>
            ),
          },
        ]}
        rowKey={(record, idx) => idx}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default MovieFormMedia;
