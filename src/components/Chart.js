// 'use client';
// import Link from 'next/link';
// import { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// export default function Chart({ connections }) {
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
//         className="border p-2 mb-4 "
//       >
//         <option className='text-black'>All</option>
//         <option className='text-black'>Pending</option>
//         <option className='text-black'>Approved</option>
//         <option className='text-black'>Rejected</option>
//       </select>

//       <BarChart width={600} height={400} data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="count" fill="#8884d8" />
//       </BarChart>
//       <Link href='/'>
//         <div className=' bg-white text-black w-24 rounded-full flex p-2 justify-center'>Back</div>
//       </Link>
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Chart({ connections = [] }) {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = statusFilter === 'All'
    ? connections
    : connections.filter(c => c.status === statusFilter);

  const dataByMonth = filtered.reduce((acc, conn) => {
    const month = conn.dateOfApplication.slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(dataByMonth).map(([month, count]) => ({
    month,
    count
  }));

  return (
    <div>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 mb-4"
      >
        <option className='text-black'>All</option>
        <option className='text-black'>Pending</option>
        <option className='text-black'>Approved</option>
        <option className='text-black'>Rejected</option>
      </select>

      <BarChart width={600} height={400} data={chartData} className='text-black'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      <Link href='/'>
      <div className=' bg-white text-black w-24 rounded-full flex p-2 justify-center'>Back</div>
      </Link>
    </div>
  );
}
