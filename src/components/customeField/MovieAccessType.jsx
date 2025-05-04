import { InfoCircleOutlined } from "@ant-design/icons";
import FormField from "@components/FormField";
import SelectField from "@components/SelectField";
import { useGetSubscriptionPlanOptionsQuery } from "@service/admin/subscriptionPlanApi";
import { Radio, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const MovieAccessType = ({ control, watch, errors, setValue }) => {
  // Load subscription plan data
  const { data: subscriptionPlanOptionsData, isLoading } =
    useGetSubscriptionPlanOptionsQuery(undefined);

  // Process subscription plans to add ancestor and descendant information
  const [subscriptionPlanOptions, setSubscriptionPlanOptions] = useState([]);

  useEffect(() => {
    if (subscriptionPlanOptionsData?.data) {
      const plans = subscriptionPlanOptionsData.data;

      // First pass: create a map of all plans with their direct children
      const planMap = new Map();
      const childrenMap = new Map();

      plans.forEach((plan) => {
        planMap.set(plan.id, plan);
        childrenMap.set(plan.id, []);
      });

      // Identify direct children for each plan
      plans.forEach((plan) => {
        if (plan.parentIds && plan.parentIds.length > 0) {
          plan.parentIds.forEach((parentId) => {
            const children = childrenMap.get(parentId) || [];
            children.push(plan.id);
            childrenMap.set(parentId, children);
          });
        }
      });

      // Second pass: compute all ancestors and descendants for each plan
      const getAncestors = (planId, visited = new Set()) => {
        const plan = planMap.get(planId);
        if (!plan || !plan.parentIds || visited.has(planId)) return [];

        visited.add(planId);
        let ancestors = [...plan.parentIds];

        plan.parentIds.forEach((parentId) => {
          ancestors = [...ancestors, ...getAncestors(parentId, visited)];
        });

        return [...new Set(ancestors)];
      };

      const getDescendants = (planId, visited = new Set()) => {
        if (visited.has(planId)) return [];
        visited.add(planId);

        const children = childrenMap.get(planId) || [];
        let descendants = [...children];

        children.forEach((childId) => {
          descendants = [...descendants, ...getDescendants(childId, visited)];
        });

        return [...new Set(descendants)];
      };

      // Format options for the select field with relationship info
      const options = plans.map((plan) => {
        const ancestorIds = getAncestors(plan.id);
        const descendantIds = getDescendants(plan.id);

        // Generate label that shows parent relationship if any
        let label = plan.name;
        if (plan.parentIds && plan.parentIds.length > 0) {
          const parentNames = plan.parentIds
            .map((id) => planMap.get(id)?.name || "")
            .filter((name) => name)
            .join(", ");

          if (parentNames) {
            label = `${plan.name} (thuộc: ${parentNames})`;
          }
        }

        return {
          value: plan.id,
          label,
          ancestorIds,
          descendantIds,
        };
      });

      setSubscriptionPlanOptions(options);
    }
  }, [subscriptionPlanOptionsData]);

  const free = watch("free");
  // Theo dõi subscriptionPlanIds từ form
  const subscriptionPlanIds = watch("subscriptionPlanIds");

  // Debug log để kiểm tra giá trị
  useEffect(() => {
    console.log("Current movie subscription plans:", subscriptionPlanIds);
    // Log ra lỗi từ form để kiểm tra
    console.log("Subscription plan errors:", errors?.subscriptionPlanIds);
  }, [subscriptionPlanIds, errors?.subscriptionPlanIds]);

  return (
    <div className="flex gap-8">
      {/* Trường isFree (Loại truy cập) */}
      <FormField
        control={control}
        name="free"
        label="Loại truy cập"
        Component={({ value, onChange }) => {
          return (
            <Radio.Group
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                // Nếu chọn miễn phí, xóa tất cả subscription plan đã chọn
                if (e.target.value === true && setValue) {
                  setValue("subscriptionPlanIds", []);
                }
              }}
              className="mb-4"
            >
              <Radio.Button value={true} className="radio-url-btn">
                Miễn phí
              </Radio.Button>
              <Radio.Button value={false} className="radio-url-btn">
                Theo gói
              </Radio.Button>
            </Radio.Group>
          );
        }}
      />

      {/* Trường subscriptionPlanIds (chỉ hiển thị khi không miễn phí) */}
      {!free && (
        <div>
          <p className="mb-1 font-medium text-white">Gói</p>
          <div>
            <Controller
              control={control}
              name="subscriptionPlanIds"
              render={({ field }) => {
                // Ensure value is always an array of numbers
                const normalizedValue = (field.value || []).map((v) =>
                  typeof v === "string" ? parseInt(v, 10) : v,
                );

                const handleSelectionChange = (newSelectedIds) => {
                  // If clearing all selections or no previous selections
                  if (!newSelectedIds.length || !normalizedValue.length) {
                    field.onChange(newSelectedIds);
                    return;
                  }

                  // Find newly added ID (if any)
                  const addedIds = newSelectedIds.filter(
                    (id) => !normalizedValue.includes(id),
                  );

                  // If just removing items, accept the change
                  if (!addedIds.length) {
                    field.onChange(newSelectedIds);
                    return;
                  }

                  // Get the newly added plan
                  const addedId = addedIds[0];
                  const addedPlan = subscriptionPlanOptions.find(
                    (plan) => plan.value === addedId,
                  );
                  if (!addedPlan) {
                    field.onChange(newSelectedIds);
                    return;
                  }

                  // Filter out incompatible selections (ancestors and descendants)
                  const filteredIds = newSelectedIds.filter((id) => {
                    // Keep the newly added ID
                    if (id === addedId) return true;

                    // Find this plan
                    const thisPlan = subscriptionPlanOptions.find(
                      (plan) => plan.value === id,
                    );
                    if (!thisPlan) return true;

                    // Remove if this plan is an ancestor of the added plan
                    if (addedPlan.ancestorIds?.includes(id)) return false;

                    // Remove if this plan is a descendant of the added plan
                    if (addedPlan.descendantIds?.includes(id)) return false;

                    // Remove if the added plan is an ancestor of this plan
                    if (thisPlan.ancestorIds?.includes(addedId)) return false;

                    // Remove if the added plan is a descendant of this plan
                    if (thisPlan.descendantIds?.includes(addedId)) return false;

                    // Keep all other plans
                    return true;
                  });

                  field.onChange(filteredIds);
                };

                return (
                  <div>
                    <SelectField
                      value={normalizedValue}
                      onChange={handleSelectionChange}
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Chọn gói"
                      options={subscriptionPlanOptions}
                      showSearch
                      optionFilterProp="label"
                      error={errors?.subscriptionPlanIds?.message}
                      loading={isLoading}
                    />

                    {isLoading && (
                      <div className="mt-2 text-blue-400">
                        Đang tải các gói...
                      </div>
                    )}
                    {!isLoading && subscriptionPlanOptions.length === 0 && (
                      <div className="mt-2 text-yellow-400">
                        Không có gói nào được tìm thấy. Đã kiểm tra API.
                      </div>
                    )}
                    <div className="mt-2 flex items-center text-xs text-gray-400">
                      <Tooltip title="Khi chọn một gói, các gói cha/con của nó sẽ bị tự động loại bỏ khỏi lựa chọn để tránh xung đột">
                        <InfoCircleOutlined className="mr-1" />
                        <span>
                          Khi chọn một gói, các gói có quan hệ cha/con sẽ tự
                          động bị loại bỏ khỏi lựa chọn.
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieAccessType;
