export default function FileUploaded({ file }) {
  return (
    <>
      <div className="flex flex-row h-9 w-11 bg-white">
        <h1>{file.name}</h1>
      </div>
    </>
  );
}
