import { Button, Dropdown, Checkbox, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";

const genreOptions = ["Hành động", "Tình cảm", "Kinh dị"];
const countryOptions = ["Việt Nam", "Hàn Quốc", "Mỹ"];
const typeOptions = ["STANDALONE", "SERIES"];

const FilterButton = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const dropdownContent = (
    <div style={{ padding: 16, width: 250, backgroundColor: "red" }}>
      <p>
        <strong>Thể loại</strong>
      </p>
      <Checkbox.Group
        options={genreOptions}
        value={selectedGenres}
        onChange={setSelectedGenres}
      />
      <p className="mt-3">
        <strong>Quốc gia</strong>
      </p>
      <Checkbox.Group
        options={countryOptions}
        value={selectedCountries}
        onChange={setSelectedCountries}
      />
      <p className="mt-3">
        <strong>Loại phim</strong>
      </p>
      <Checkbox.Group
        options={typeOptions}
        value={selectedTypes}
        onChange={setSelectedTypes}
      />
      {/* Có thể thêm nút Áp dụng / Xoá lọc */}
    </div>
  );

  return (
    <Dropdown
      overlay={dropdownContent}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button icon={<FilterOutlined />}>Bộ lọc</Button>
    </Dropdown>
  );
};

export default FilterButton;
