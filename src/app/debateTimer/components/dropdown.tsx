const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {label && <label className="text-orange-600 text-lg font-semibold">{label}</label>}
      <select
        className="bg-black/60 border border-orange-600 text-orange-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {/* "Choose here" is just a placeholder, disabled after first selection */}
        <option value="" disabled={!!value}>
          Choose here
        </option>

        {options.map((option) => (
          <option key={option} value={option} className="bg-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
