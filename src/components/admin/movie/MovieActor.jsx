import { Select, Input, Button, Spin, Space, Avatar } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useLazyGetActorsQuery } from "@service/admin/actorApi";

const MovieActor = ({ fields, append, remove, control, errors }) => {
  const [actorOptions, setActorOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchActors, { data, isLoading }] = useLazyGetActorsQuery();
  const loadingRef = useRef(false);

  // Ban đầu tải danh sách diễn viên từ API
  useEffect(() => {
    loadingRef.current = true;
    fetchActors({ search, page, size: 10 });
  }, [search, page, fetchActors]);

  // Xử lý dữ liệu từ API và cập nhật actorOptions
  useEffect(() => {
    if (data?.data?.result) {
      const newOptions = data.data.result.map((actor) => ({
        label: actor.name,
        value: actor.id,
        avatarUrl: actor.avatarUrl,
      }));

      setActorOptions((prev) => {
        // Chỉ giữ lại options mới và những options cũ không bị trùng
        const newIds = new Set(newOptions.map((o) => o.value));
        const filteredPrev =
          page === 1 ? prev.filter((p) => !newIds.has(p.value)) : prev;

        return [...filteredPrev, ...newOptions];
      });

      setHasMore(data.data.result.length > 0);
      loadingRef.current = false;
    }
  }, [data, page]);

  // Lọc option để không cho chọn lại diễn viên đã chọn
  const getAvailableOptions = (currentIndex) => {
    const selectedIds = fields
      .filter((_, idx) => idx !== currentIndex)
      .map((a) => a.actorId)
      .filter(Boolean);
    return actorOptions.filter((opt) => !selectedIds.includes(opt.value));
  };

  // Render giá trị được chọn (dùng actorName và avatarUrl từ fields nếu có)
  const renderSelectedValue = (index, value) => {
    const field = fields[index];

    // Nếu đây là diễn viên đã có trong danh sách ban đầu
    if (field && field.actorId === value && field.actorName) {
      return (
        <Space>
          <Avatar
            src={field.avatarUrl}
            size="small"
            style={{ backgroundColor: "#1890ff" }}
          >
            {!field.avatarUrl && field.actorName.charAt(0).toUpperCase()}
          </Avatar>
          {field.actorName}
        </Space>
      );
    }

    // Nếu là diễn viên mới chọn từ dropdown
    const option = actorOptions.find((o) => o.value === value);
    if (option) {
      return (
        <Space>
          <Avatar
            src={option.avatarUrl}
            size="small"
            style={{ backgroundColor: "#1890ff" }}
          >
            {!option.avatarUrl && option.label.charAt(0).toUpperCase()}
          </Avatar>
          {option.label}
        </Space>
      );
    }

    return null;
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-dark-100 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-white">
        Diễn viên & Vai diễn
      </h2>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-3 rounded bg-dark-200 p-4 sm:flex-row"
          >
            <Controller
              control={control}
              name={`movieActors.${index}.actorId`}
              render={({ field: { onChange, value } }) => (
                <Select
                  showSearch
                  placeholder="Tìm diễn viên"
                  style={{ width: 220 }}
                  className="bg-white"
                  value={value ?? undefined}
                  onChange={(newValue) => {
                    onChange(newValue);
                  }}
                  onSearch={(val) => {
                    setSearch(val);
                    setPage(1);
                  }}
                  onPopupScroll={(e) => {
                    if (
                      !loadingRef.current &&
                      hasMore &&
                      e.target.scrollTop + e.target.offsetHeight >=
                        e.target.scrollHeight - 10
                    ) {
                      setPage((prev) => prev + 1);
                    }
                  }}
                  notFoundContent={isLoading ? <Spin size="small" /> : null}
                  filterOption={false}
                  optionFilterProp="label"
                  dropdownRender={(menu) => menu}
                  suffixIcon={null}
                  labelRender={() => renderSelectedValue(index, value)}
                >
                  {getAvailableOptions(index).map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      <Space>
                        <Avatar
                          src={option.avatarUrl}
                          size="small"
                          style={{ backgroundColor: "#1890ff" }}
                        >
                          {!option.avatarUrl &&
                            option.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {option.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              )}
            />

            <Controller
              control={control}
              name={`movieActors.${index}.characterName`}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Tên vai diễn"
                  style={{ width: 220 }}
                />
              )}
            />

            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => remove(index)}
              className="mt-2 sm:mt-0"
            >
              Xóa
            </Button>
          </div>
        ))}
        <Button
          icon={<PlusOutlined />}
          onClick={() => append({ actorId: null, characterName: "" })}
          type="dashed"
          className="w-full"
        >
          Thêm diễn viên
        </Button>
        {errors && <div className="text-xs text-red-500">{errors.message}</div>}
      </div>
    </div>
  );
};

export default MovieActor;
