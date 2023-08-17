
'use client';
import {
  getAllDevices,
} from '/prisma/device'
import { useEffect,useState} from "react"
//@ts-ignore
function Page() {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
  //@ts-ignore
  async function fetchData() {
    const devicesData = await getAllDevices()
      setDevices(devicesData);
    }
    fetchData();
  }, []);
  
  return (
    <>
      <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize">
        Dashboard
      </h1>
      <div className="mt-4">
        <table className="table-auto mx-auto border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Device ID</th>
              <th className="border p-2">Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="border">
                <td className="border p-2">{device.id}</td>
                <td className="border p-2">{device.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Page;     
            
