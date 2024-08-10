import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation} from "react-query";
import DropZone from "./components/DropZone";
import FileUploaded from "./components/FileUploaded";

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
  const [data, setData] = useState([]);
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
        const lines = dataReceived.data.ParsedResults[0].TextOverlay["Lines"];
        setData(lines);
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
      {mutation.isIdle && (
        <>
          <h1 className="text-2xl text-white text-center p-10 font-bold">
            Upload a file
          </h1>

          {file ? <FileUploaded file={file} /> : <DropZone onFileChange={handleFileChange} />}
          <div className="flex justify-center pt-10">
            <button
              onClick={uploadFile}
              className="bg-white h-12 w-24 rounded-md text-blue-500 font-medium hover:bg-blue-500 hover:text-white"
            >
              Upload
            </button>
          </div>
        </>
      )}
      {mutation.isLoading && <p>Uploading...</p>}
      {mutation.isError && (
        <p>Error uploading file: {mutation.error.message}</p>
      )}
      {mutation.isSuccess && (
        <>
          <div>
            {data.map((line, index) =>{
              return <p key={index} className="text-white">{line.LineText}</p>
})}
          </div>
        </>
      )}
    </div>
  );
}
