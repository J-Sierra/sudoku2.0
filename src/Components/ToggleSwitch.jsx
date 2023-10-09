const ToggleSwitch = ({ onChange, checked }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor="toggle"
        className="relative flex-shrink-0 cursor-pointer w-8 h-4 sm:w-12 sm:h-6 bg-gray-300 rounded-full p-1 transition-all duration-300"
      >
        <div
          className={`${
            checked
              ? "translate-x-4 sm:translate-x-6 bg-green-500"
              : "translate-x-0 bg-white"
          } w-2 h-2 sm:w-4 sm:h-4 rounded-full shadow-md transform transition-transform duration-300`}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
