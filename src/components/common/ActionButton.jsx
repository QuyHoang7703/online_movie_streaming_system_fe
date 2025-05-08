const ActionButton = ({ icon, text, link }) => {
  return (
    <div className="rounded-xl p-3 hover:bg-gray-800/50">
      <a
        href={link}
        className="flex flex-col items-center gap-2 hover:text-mainUserColor-200"
      >
        {icon}
        <span>{text}</span>
      </a>
    </div>
  );
};
export default ActionButton;
