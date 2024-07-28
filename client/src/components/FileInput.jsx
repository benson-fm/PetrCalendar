import PropTypes from "prop-types";

export default function FileInput({ onFileChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return (
    <>
      <label htmlFor="file" className="text-blue-500 hover:underline">browse</label>
      <input type="file" id="file" onChange={handleFileChange} className="hidden" />
    </>
  );
}

FileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};
