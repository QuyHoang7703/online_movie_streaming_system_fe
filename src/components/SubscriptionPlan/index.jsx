// import {
//   Button,
//   Card,
//   Table,
//   Tag,
//   Typography,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Space,
//   Select,
//   Divider,
// } from "antd";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   PlusOutlined,
//   MinusCircleOutlined,
//   PlusCircleFilled,
// } from "@ant-design/icons";
// import { useState, useEffect } from "react";

// const { Title, Text } = Typography;

// const AdminSubscriptionPlan = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [form] = Form.useForm();
//   const [subscriptionPlans, setSubscriptionPlans] = useState([
//     {
//       id: 1,
//       name: "VIP",
//       description: "Dành cho Fan phim Châu Á và VieON Original",
//       parentPlanId: null,
//       features: [
//         { name: "Số thiết bị", value: "2" },
//         { name: "Chất lượng", value: "Full HD" },
//         { name: "Tải về", value: "Có" },
//       ],
//       durations: [
//         { days: 30, price: 69000 },
//         { days: 90, price: 180000 },
//         { days: 365, price: 600000 },
//       ],
//       status: "active",
//     },
//     {
//       id: 2,
//       name: "VIP PRO",
//       description: "Nâng cấp từ gói VIP",
//       parentPlanId: 1,
//       features: [
//         { name: "Số thiết bị", value: "4" },
//         { name: "Chất lượng", value: "4K" },
//         { name: "Tải về", value: "Có" },
//         { name: "Xem trước", value: "Có" },
//       ],
//       durations: [
//         { days: 30, price: 119000 },
//         { days: 180, price: 500000 },
//       ],
//       status: "active",
//     },
//   ]);

//   const columns = [
//     {
//       title: "Tên gói",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <Space>
//           <Text strong>{text}</Text>
//           {record.parentPlanId && (
//             <Tag color="blue">
//               Con của:{" "}
//               {
//                 subscriptionPlans.find((p) => p.id === record.parentPlanId)
//                   ?.name
//               }
//             </Tag>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: "Mô tả",
//       dataIndex: "description",
//       key: "description",
//       width: "25%",
//     },
//     {
//       title: "Đặc trưng",
//       dataIndex: "features",
//       key: "features",
//       render: (features) => (
//         <ul className="list-disc pl-4">
//           {features.map((feature, index) => (
//             <li key={index}>
//               {feature.name}: {feature.value}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: "Thời hạn & Giá",
//       dataIndex: "durations",
//       key: "durations",
//       render: (durations) => (
//         <Space direction="vertical">
//           {durations.map((duration) => (
//             <Tag key={duration.days} color="blue">
//               {duration.days === 30
//                 ? "1 tháng"
//                 : duration.days === 90
//                   ? "3 tháng"
//                   : duration.days === 180
//                     ? "6 tháng"
//                     : duration.days === 365
//                       ? "12 tháng"
//                       : `${duration.days} ngày`}
//               : {duration.price.toLocaleString("vi-VN")}đ
//             </Tag>
//           ))}
//         </Space>
//       ),
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag color={status === "active" ? "success" : "error"}>
//           {status === "active" ? "Đang hoạt động" : "Tạm ngưng"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Thao tác",
//       key: "action",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => handleEdit(record)}
//           >
//             Sửa
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record.id)}
//           >
//             Xóa
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const handleEdit = (plan) => {
//     setEditingPlan(plan);
//     form.setFieldsValue({
//       name: plan.name,
//       description: plan.description,
//       parentPlanId: plan.parentPlanId,
//       features: plan.features,
//       durations: plan.durations,
//       status: plan.status,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     Modal.confirm({
//       title: "Xác nhận xóa",
//       content: "Bạn có chắc chắn muốn xóa gói dịch vụ này?",
//       okText: "Xóa",
//       cancelText: "Hủy",
//       okButtonProps: { danger: true },
//       onOk: () => {
//         console.log("Deleting plan:", id);
//         // Implement delete logic here
//       },
//     });
//   };

//   const handleAddNew = () => {
//     setEditingPlan(null);
//     form.resetFields();
//     setIsModalOpen(true);
//   };

//   const handleModalOk = () => {
//     form.validateFields().then((values) => {
//       console.log("Form values:", values);
//       // Implement save/update logic here
//       setIsModalOpen(false);
//     });
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <p className="text-xl font-bold text-white sm:text-2xl">
//           Danh sách phim
//         </p>
//         <Button
//           type="primary"
//           icon={<PlusCircleFilled size={50} />}
//           onClick={handleAddNew}
//           className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
//         >
//           Thêm gói mới
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={subscriptionPlans}
//         rowKey="id"
//         bordered
//       />

//       <Modal
//         title={editingPlan ? "Chỉnh sửa gói dịch vụ" : "Thêm gói dịch vụ mới"}
//         open={isModalOpen}
//         onOk={handleModalOk}
//         onCancel={() => setIsModalOpen(false)}
//         width={800}
//       >
//         <Form form={form} layout="vertical" className="mt-4">
//           <Form.Item
//             name="name"
//             label="Tên gói"
//             rules={[{ required: true, message: "Vui lòng nhập tên gói" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Mô tả"
//             rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
//           >
//             <Input.TextArea rows={2} />
//           </Form.Item>

//           <Form.Item name="parentPlanId" label="Gói cha">
//             <Select
//               allowClear
//               placeholder="Chọn gói cha (nếu có)"
//               options={subscriptionPlans.map((plan) => ({
//                 label: plan.name,
//                 value: plan.id,
//               }))}
//             />
//           </Form.Item>

//           <Divider orientation="left">Đặc trưng</Divider>
//           <Form.List name="features">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Space
//                     key={key}
//                     style={{ display: "flex", marginBottom: 8 }}
//                     align="baseline"
//                   >
//                     <Form.Item
//                       {...restField}
//                       name={[name, "name"]}
//                       rules={[
//                         { required: true, message: "Thiếu tên đặc trưng" },
//                       ]}
//                     >
//                       <Input placeholder="Tên đặc trưng" />
//                     </Form.Item>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "value"]}
//                       rules={[{ required: true, message: "Thiếu giá trị" }]}
//                     >
//                       <Input placeholder="Giá trị" />
//                     </Form.Item>
//                     <MinusCircleOutlined onClick={() => remove(name)} />
//                   </Space>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     block
//                     icon={<PlusOutlined />}
//                   >
//                     Thêm đặc trưng
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List>

//           <Divider orientation="left">Thời hạn & Giá</Divider>
//           <Form.List name="durations">
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <Space
//                     key={key}
//                     style={{ display: "flex", marginBottom: 8 }}
//                     align="baseline"
//                   >
//                     <Form.Item
//                       {...restField}
//                       name={[name, "days"]}
//                       rules={[{ required: true, message: "Thiếu số ngày" }]}
//                     >
//                       <InputNumber min={1} placeholder="Số ngày" />
//                     </Form.Item>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "price"]}
//                       rules={[{ required: true, message: "Thiếu giá" }]}
//                     >
//                       <InputNumber
//                         min={0}
//                         placeholder="Giá"
//                         formatter={(value) =>
//                           value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                         }
//                         parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
//                       />
//                     </Form.Item>
//                     <MinusCircleOutlined onClick={() => remove(name)} />
//                   </Space>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => add()}
//                     block
//                     icon={<PlusOutlined />}
//                   >
//                     Thêm thời hạn
//                   </Button>
//                 </Form.Item>
//               </>
//             )}
//           </Form.List>

//           <Form.Item
//             name="status"
//             label="Trạng thái"
//             rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
//           >
//             <Select
//               options={[
//                 { label: "Đang hoạt động", value: "active" },
//                 { label: "Tạm ngưng", value: "inactive" },
//               ]}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AdminSubscriptionPlan;
