"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [arraydata,setarraydata] = useState([])
  const data =async()=>{
    const response = await fetch("/api/users/getuser")
    const jsondata = await response.json()
    setarraydata(jsondata.data);
  }
  useEffect(()=>{
     data()
  },[])
  return (
<div className="container mx-auto py-8">
  <div className="overflow-x-auto">
    <table className="w-full table-auto mx-auto border-collapse">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="py-2 px-4 border border-blue-600">Name</th>
          <th className="py-2 px-4 border border-blue-600">Email</th>
          <th className="py-2 px-4 border border-blue-600">Password</th>
        </tr>
      </thead>
      <tbody>
        {arraydata.map((item, index) => (
          <tr
            key={index}
            className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-colors"
          >
            <td className="py-2 px-4 border border-gray-300">{item.name}</td>
            <td className="py-2 px-4 border border-gray-300">{item.email}</td>
            <td className="py-2 px-4 border border-gray-300">{item.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
