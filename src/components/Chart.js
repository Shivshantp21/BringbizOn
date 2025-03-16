// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// export default function Chart({ connections = [] }) {
//   const [statusFilter, setStatusFilter] = useState('All');

//   const filtered = statusFilter === 'All'
//     ? connections
//     : connections.filter(c => c.status === statusFilter);

//   const dataByMonth = filtered.reduce((acc, conn) => {
//     const month = conn.dateOfApplication.slice(0, 7);
//     acc[month] = (acc[month] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.entries(dataByMonth).map(([month, count]) => ({
//     month,
//     count
//   }));

//   return (
//     <div>
//       <select
//         value={statusFilter}
//         onChange={(e) => setStatusFilter(e.target.value)}
//         className="border p-2 mb-4"
//       >
//         <option className='text-black'>All</option>
//         <option className='text-black'>Pending</option>
//         <option className='text-black'>Approved</option>
//         <option className='text-black'>Rejected</option>
//       </select>

//       <BarChart width={600} height={400} data={chartData} className='text-black'>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="count" fill="#8884d8" />
//       </BarChart>
//       <Link href='/'>
//       <div className=' bg-white text-black w-24 rounded-full flex p-2 justify-center'>Back</div>
//       </Link>
//     </div>
//   );
// }



'use client';

import Link from 'next/link';
import { useState } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default function Chart({ connections = [] }) {
  const [statusFilter, setStatusFilter] = useState('All');


  const filtered = statusFilter === 'All'
    ? connections
    : connections.filter(c => c.status === statusFilter);


  const dataByMonth = filtered.reduce((acc, conn) => {
    const month = conn.dateOfApplication.slice(0, 7); // Format: YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(dataByMonth).map(([month, count]) => ({
    month,
    count
  }));

  return (
    <div className="flex flex-col items-center ">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 mb-6 rounded text-white"
      >
        <option className='text-white bg-black'>All</option>
        <option className='text-white bg-black'>Pending</option>
        <option className='text-white bg-black'>Approved</option>
        <option className='text-white bg-black'>Rejected</option>
      </select>

      <LineChart
        width={800}
        height={400}
        data={chartData}
        className="bg-white rounded-lg p-4"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} />
      </LineChart>

      <Link href='/'>
        <div className='mt-8 bg-white text-black w-24 rounded-full flex p-2 justify-center cursor-pointer hover:bg-gray-400 transition'>
          Back
        </div>
      </Link>
    </div>
  );
}
