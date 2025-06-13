// export const videoVersionTypes = {
//   VOICEOVER: "Lồng tiếng",
//   VIETSUB: "Phụ đề",
//   DUBBED: "Thuyết minh",
// };

export const videoVersionTypes = {
  VOICEOVER: {
    label: "Lồng tiếng",
    colorBg: "bg-red-500/50",
    colorText: "text-red-400",
    icon: "LD",
  },
  VIETSUB: {
    label: "Phụ đề",
    colorBg: "bg-green-500/50",
    colorText: "text-green-400",
    icon: "CC",
  },
  DUBBED: {
    label: "Thuyết minh",
    colorBg: "bg-yellow-500/50",
    colorText: "text-yellow-500",
    icon: "TM",
  },
};

export const VideoVersionMapper = {
  VIETSUB: { label: "P.Đ", color: "bg-green-600" },
  VOICEOVER: { label: "T.M", color: "bg-blue-600" },
  DUBBED: { label: "L.T", color: "bg-red-600" },
};
