import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const Result = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const [maxMinValues, setMaxMinValues] = useState({});
  const [kpCollection, setKpCollection] = useState([]);
  const [xCollection, setXCollection] = useState([]);

  useEffect(() => {
    setProjectInfo(JSON.parse(localStorage.getItem("projectInformation")));
    setMaxMinValues(JSON.parse(localStorage.getItem("maxMinValues")));
    setKpCollection(JSON.parse(localStorage.getItem("kpCollection")));
    setXCollection(JSON.parse(localStorage.getItem("xCollection")));
  }, []);

  const chartData = kpCollection?.map((_, index) => ({
    kp: index,
    x: parseFloat(xCollection[index]),
  }));
 
  return (
    <div className="bg-secondary py-16">
      <div className="boxed-container">
        {/* table */}
        <h2 className="text-black font-bold text-2xl mb-3">Form Info Table:</h2>
        {projectInfo && maxMinValues ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left bg-white">
              <thead className="border-b font-medium bg-primary text-white">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Project Name
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Project Description
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Client
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Contractor
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Max X
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Min X
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Max Y
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Min Y
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Max Z
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Min Z
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b last:border-0 dark:border-neutral-500">
                  <td className="pl-6 pr-2 py-4 font-medium align-top">
                    {projectInfo?.projectName}
                  </td>
                  <td className="px-3 py-4 w-56 break-all ">
                    {projectInfo?.projectDescription}
                  </td>
                  <td className=" px-3 py-4 align-top">
                    {projectInfo?.client}
                  </td>
                  <td className=" px-3 py-4 align-top">
                    {projectInfo?.contractor}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.max_X}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.min_X}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.max_Y}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.min_Y}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.max_Z}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-top">
                    {maxMinValues?.min_Z}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <p>
              Sorry you haven&apos;t submitted the form. Submit and come back to
              see the results
            </p>
          </>
        )}

        {/* Chart */}
        {kpCollection && xCollection ? (
          <>
            <h2 className="text-black font-bold text-2xl mt-6 mb-3">
              Chart of KP and X:
            </h2>
            <div className="w-100 overflow-x-scroll ">
              <BarChart width={20000} height={600} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="kp" />
                <YAxis dataKey="x" />
                <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                const data = payload[0].payload;
                return (
                  <div className="custom-tooltip bg-white p-3">
                    <p>KP: {data.kp}</p>
                    <p>X: {data.x}</p>
                  </div>
                );
              }
              return null;
            }}
          />
                <Legend />
                <Bar dataKey="x" fill="#F4514A" />
              </BarChart>
            </div>
          </>
        ) : (
          <></>
        )}

      </div>
    </div>
  );
};

export default Result;
