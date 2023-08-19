import { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const stepArray = [1, 2];
  const [stepNo, setStepNo] = useState(stepArray[0]);
  const [projectInformation, setProjectInfo] = useState({
    projectName: "",
    projectDescription: "",
    client: "",
    contractor: "",
  });
  const [maxMinValues, setMaxMinValues] = useState({
    max_X: "",
    min_X: "",
    max_Y: "",
    min_Y: "",
    max_Z: "",
    min_Z: "",
  });

  // handle general input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectInfo((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // handle csv upload
  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        calculateMinMax(result.data);
      },
    });
  };

  // calculate min max from csv upload
  const calculateMinMax = (data) => {
    // Assuming the first row contains column headers
    const headers = data[0];

    const columnIndex = {
      KP: headers.indexOf("KP"),
      X: headers.indexOf("X"),
      Y: headers.indexOf("Y"),
      Z: headers.indexOf("Z"),
    };

    // checking valid row
    const isValidEntry = (entry) =>
      !entry.includes("") &&
      entry[0] !== "KP" &&
      entry[1] !== "X" &&
      entry[3] !== "Y" &&
      entry[4] !== "z";

    // extracting values of each column
    const extractCoordinate = (index) =>
      data.filter(isValidEntry).map((entry) => parseFloat(entry[index]));

    const kpCollection = extractCoordinate(columnIndex.KP);
    const xCollection = extractCoordinate(columnIndex.X);
    const yCollection = extractCoordinate(columnIndex.Y);
    const zCollection = extractCoordinate(columnIndex.Z);

    // setting kp and x collections to localstorage for using chart
    localStorage.setItem("kpCollection", JSON.stringify(kpCollection));
    localStorage.setItem("xCollection", JSON.stringify(xCollection));

    // min max value
    const maxX = Math.max(...xCollection).toString();
    const minX = Math.min(...xCollection).toString();
    const maxY = Math.max(...yCollection).toString();
    const minY = Math.min(...yCollection).toString();
    const maxZ = Math.max(...zCollection).toString();
    const minZ = Math.min(...zCollection).toString();

    // setting minmax value to state
    setMaxMinValues({
      max_X: maxX,
      min_X: minX,
      max_Y: maxY,
      min_Y: minY,
      max_Z: maxZ,
      min_Z: minZ,
    });
  };

  const handleMinMaxChange = (event) => {
    const { name, value } = event.target;
    setMaxMinValues((prevMinMax) => ({
      ...prevMinMax,
      [name]: value,
    }));
  };

  // next step handler
  const next = () => {
    if (
      stepNo === 1 &&
      projectInformation.projectName &&
      projectInformation.client &&
      projectInformation.contractor &&
      projectInformation.projectDescription
    ) {
      setStepNo(stepNo + 1);
    } else {
      toast.error('Please fill up all the input fields!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  // prev step handler
  const pre = () => {
    setStepNo(stepNo - 1);
  };
  // final submit handler
  const finalSubmit = () => {
    if (
      maxMinValues.max_X &&
      maxMinValues.max_Y &&
      maxMinValues.max_Z &&
      maxMinValues.min_X &&
      maxMinValues.min_Y &&
      maxMinValues.min_Z
    ) {
      toast.success('Successfully Submitted, will be in touch soon!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });
      localStorage.setItem(
        "projectInformation",
        JSON.stringify(projectInformation)
      );
      localStorage.setItem("maxMinValues", JSON.stringify(maxMinValues));
      
      return navigate("result");
    } else {
      toast.error('Please fill up all the input fields!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <div className=" bg-secondary pb-16 pt-12 px-5">
      <h2 className="text-center pb-6 text-2xl font-bold">Fill up the form and send us</h2>
      {/* form div */}
      <div className=" flex justify-center items-center ">
        <div className="card sm:w-[500px] w-full  rounded-md shadow-md bg-white sm:p-5 p-4">
          {/* step progress */}
          <div className="flex justify-center items-center mb-3">
            {stepArray.map((v, i) => (
              <>
                <div
                  className={`w-[35px] my-3 rounded-full ${
                    stepNo - 1 === i || stepNo === stepArray.length
                      ? "bg-primary text-white"
                      : "bg-secondary text-black"
                  } h-[35px] flex justify-center items-center`}
                >
                  {v}
                </div>
                {i !== stepArray.length - 1 && (
                  <div
                    className={`sm:w-[400px] w-[250px] h-[2px] ${
                      stepNo === stepArray.length
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  ></div>
                )}
              </>
            ))}
          </div>
          {/* 1st step */}
          {stepNo === 1 && (
            <div>
              <div className="flex flex-col mb-2">
                <label htmlFor="projectName">Project Name</label>
                <input
                  value={projectInformation.projectName}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  name="projectName"
                  id="projectName"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="clientName">Client Name</label>
                <input
                  value={projectInformation.client}
                  onChange={handleInputChange}
                  placeholder="Client Name"
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  name="client"
                  id="clientName"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="Contractor">Contractor Name</label>
                <input
                  value={projectInformation.contractor}
                  onChange={handleInputChange}
                  placeholder="Contractor Name"
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  name="contractor"
                  id="contractorName"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="session">Project Description</label>
                <textarea
                  value={projectInformation.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Project Description"
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  name="projectDescription"
                  id="projectDescription"
                  rows="5"
                  cols="50"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={next}
                  className="px-3 sm:py-2 py-1 text-lg rounded-md w-full text-white bg-primary"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/* 2nd step */}
          {stepNo === 2 && (
            <div>
                <div className="flex flex-col mb-2">
                <label htmlFor="projectName">Project Name</label>
                <input
                  value={projectInformation.projectName}
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="clientName">Client Name</label>
                <input
                  value={projectInformation.client}
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="Contractor">Contractor Name</label>
                <input
                  value={projectInformation.contractor}
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  type="text"
                  disabled
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="session">Project Description</label>
                <textarea
                  value={projectInformation.projectDescription}
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  rows="5"
                  cols="50"
                  disabled
                ></textarea>
              </div>
              <div className="flex flex-col mb-2">
                <input
                  type="file"
                  onChange={handleCsvUpload}
                  className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                  accept=".csv"
                  name="uploadFile"
                  id="uploadFile"
                />
              </div>
              {/* max-min x */}
              <div className="sm:flex justify-center items-center mb-2 sm:space-x-3 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Max X</label>
                  <input
                    type="number"
                    name="max_X"
                    value={maxMinValues.max_X}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Max X"
                  ></input>
                </div>
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Min X</label>
                  <input
                    type="number"
                    name="min_X"
                    value={maxMinValues.min_X}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Min X"
                  ></input>
                </div>
              </div>
              {/* max-min y */}
              <div className="sm:flex justify-center items-center mb-2 sm:space-x-3 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Max Y</label>
                  <input
                    type="number"
                    name="max_Y"
                    value={maxMinValues.max_Y}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Max Y"
                  ></input>
                </div>
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Min Y</label>
                  <input
                    type="number"
                    name="min_Y"
                    value={maxMinValues.min_Y}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Min Y"
                  ></input>
                </div>
              </div>
              {/* max-min z */}
              <div className="sm:flex justify-center items-center mb-2 sm:space-x-3 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Max Z</label>
                  <input
                    type="number"
                    name="max_Z"
                    value={maxMinValues.max_Z}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Max Z"
                  ></input>
                </div>
                <div className="flex flex-col sm:w-1/2 w-full">
                  <label htmlFor="session">Min Z</label>
                  <input
                    type="number"
                    name="min_Z"
                    value={maxMinValues.min_Z}
                    className="p-2 border border-secondary mt-1 outline-0  focus:border-[#F4514A] rounded-md"
                    onChange={handleMinMaxChange}
                    placeholder="Min Z"
                  ></input>
                </div>
              </div>

              {/* Button-prev-next */}
              <div className="mt-4 gap-3 flex justify-center items-center">
                <button
                  onClick={pre}
                  className="px-3 sm:py-2 py-1  text-lg rounded-md w-full text-black bg-secondary"
                >
                  Previous
                </button>
                <button
                  onClick={finalSubmit}
                  className="px-3 sm:py-2 py-1 text-lg rounded-md w-full text-white bg-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* form div end */}
    </div>
  );
}

export default App;
