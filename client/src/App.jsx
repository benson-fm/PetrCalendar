import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import DropZone from "./components/DropZone";

const queryClient = new QueryClient();
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}

function Component() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  const mutation = useMutation(
    (file) => {
      const formData = new FormData();
      formData.append("file", file);

      return fetch(`${serverURL}/api/upload`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
    {
      onSuccess: (dataReceived) => {
        setData(dataReceived.data.ParsedResults[0].TextOverlay["Lines"]);
        console.log(dataReceived.data.ParsedResults[0].TextOverlay["Lines"]);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleFileChange = (file) => {
    setFile(file);
  };

  const uploadFile = () => {
    if (file) {
      mutation.mutate(file);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-slate-800">
      <h1 className="text-2xl text-white text-center p-10 font-bold">
        Upload a file
      </h1>
      <DropZone onFileChange={handleFileChange} />
      <div className="flex justify-center pt-10">
        <button
          onClick={uploadFile}
          className="bg-white h-12 w-24 rounded-md text-blue-500 font-medium hover:bg-blue-500 hover:text-white"
        >
          Upload
        </button>
      </div>
      {mutation.isLoading && <p>Uploading...</p>}
      {mutation.isError && (
        <p>Error uploading file: {mutation.error.message}</p>
      )}
      {mutation.isSuccess && (
        <div>
          <p>File uploaded successfully</p>
          <div className="text-white">
          {data.map((line, index) => (
              <p key={index}>{line.text}</p>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
