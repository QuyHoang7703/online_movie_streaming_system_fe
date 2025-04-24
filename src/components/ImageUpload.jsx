import React, { useState } from "react";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "@styles/styles.css";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ fileList, onChange, className }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Handle image preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Button to upload image
  // const uploadButton = (
  //   <button className="text-white" type="button">
  //     <PlusOutlined />
  //     <div className="mt-3">Tải ảnh</div>
  //   </button>
  // );
  const uploadButton = (
    <button
      className="flex flex-col items-center justify-center text-white"
      type="button"
      style={{ width: 180, height: 180, fontSize: 28 }}
    >
      <PlusOutlined style={{ fontSize: 40 }} />
      <div className="mt-3 text-base">Tải ảnh</div>
    </button>
  );

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList || []}
        onPreview={handlePreview}
        onChange={onChange}
        className={className}
        beforeUpload={() => false} // không upload ngay
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ImageUpload;
