import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export default function App() {
  let img;
  const handleChange = (e) => {
    const file = e.target.files[0]
    const cld = new Cloudinary({cloud: {cloudName: 'derbdmhio'}});
    console.log(file)
    console.log("bytes are", file.size / 1000000)

    img = cld.image(file.name)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500));

  }

// we need to add the pciture to the cloudify database, how do I do that, I really don't know.

  return (
    <>
      <div className="flex w-full h-dvh bg-slate-800 items-center justify-center">
        <div className="card w-96 h-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-around">Petr Calendar</h2>
                <p className="text-center align-middle">Insert your image below!</p>
                <button className="btn bg-blue-200">Download Button</button>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleChange}/>
            </div>
            <AdvancedImage cldImg={img}/>
        </div>
      </div>
    </>
  )
}