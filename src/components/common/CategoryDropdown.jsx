import { useState } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CategoryDropdown = ({
  title,
  items,
  columnCount = 3,
  filterType = "genre",
  onItemClick,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  // Handle item click to add filter params
  const handleItemClick = (item, e) => {
    e.preventDefault();

    // If external handler is provided, call it and return
    if (onItemClick) {
      onItemClick(item);
      setOpen(false);
      return;
    }

    // Otherwise use the default navigation behavior
    // Get the current path without the search parameters
    const baseMovieListPath = location.pathname;

    // Create new search params based on current URL
    const searchParams = new URLSearchParams(location.search);

    // Clear any existing params of the same type (genre or country)
    searchParams.delete(filterType);

    // Add the new filter
    searchParams.append(filterType, item.value || item.label);

    // Determine the target page based on current page
    let targetPath = baseMovieListPath;

    // If we're not already on a movie list page, redirect to the appropriate one
    if (!baseMovieListPath.includes("phim-")) {
      targetPath = "/phim-le";
    }

    // Navigate to the new URL with the filter parameter
    navigate(`${targetPath}?${searchParams.toString()}`);
    setOpen(false);
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
              <a
                href={item.link}
                className="block text-white transition-colors duration-200 hover:text-mainColor"
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.label}
              </a>
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
      <div className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-white transition-colors duration-200 hover:text-mainColor">
        {title} <CaretDownOutlined className="text-xs" />
      </div>
    </Dropdown>
  );
};

export default CategoryDropdown;
