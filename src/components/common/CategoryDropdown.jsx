import { useState } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ title, items, columnCount = 3 }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  // Chia các items thành nhiều cột
  const itemsPerColumn = Math.ceil(items.length / columnCount);
  const columns = [];

  for (let i = 0; i < columnCount; i++) {
    const columnItems = items.slice(
      i * itemsPerColumn,
      (i + 1) * itemsPerColumn,
    );
    if (columnItems.length > 0) {
      columns.push(columnItems);
    }
  }

  const dropdownContent = (
    <div className="mt-1 grid min-w-[450px] grid-cols-3 gap-4 rounded-lg bg-[#1a1d29] p-5 shadow-lg">
      {columns.map((column, colIndex) => (
        <ul key={colIndex} className="m-0 list-none p-0">
          {column.map((item, index) => (
            <li key={index} className="py-2">
              <Link
                to={item.link}
                className="block text-white transition-colors duration-200 hover:text-mainColor"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

  return (
    <Dropdown
      overlay={dropdownContent}
      open={open}
      onOpenChange={handleOpenChange}
      trigger={["hover"]}
      overlayStyle={{
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: 0,
      }}
    >
      <div className="flex cursor-pointer items-center gap-1.5 text-white transition-colors duration-200 hover:text-mainColor">
        {title} <CaretDownOutlined className="text-xs" />
      </div>
    </Dropdown>
  );
};

export default CategoryDropdown;
