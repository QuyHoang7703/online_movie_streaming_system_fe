import { Link } from "react-router-dom";

const ActionButton = ({
  icon,
  text,
  link,
  isProcessing,
  onClick,
  className = "",
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (!isProcessing && onClick) {
      onClick();
    }
  };
  return (
    <div className="rounded-xl p-3 hover:bg-gray-800/50" onClick={handleClick}>
      <Link
        href={link}
        className={`flex flex-col items-center gap-2 hover:text-mainUserColor-200 ${className}`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    </div>
  );
};
export default ActionButton;
