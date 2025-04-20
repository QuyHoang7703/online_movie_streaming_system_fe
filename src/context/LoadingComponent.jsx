import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingComponent = ({ fullscreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "fixed inset-0 z-50 bg-[#323D4E] bg-opacity-90" : ""
      }`}
    >
      <DotLottieReact
        src="/animation-loading.lottie"
        autoplay
        loop
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default LoadingComponent;
