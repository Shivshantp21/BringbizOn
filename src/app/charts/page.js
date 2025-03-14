// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// // export default function Charts() {
// //   const [connections, setConnections] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState('All');

// //   useEffect(() => {
// //     fetch('/api/connections')
// //       .then(res => res.json())
// //       .then(data => setConnections(data));
// //   }, []);

// //   const filtered = statusFilter === 'All' ? connections : connections.filter(c => c.status === statusFilter);

// //   const dataByMonth = filtered.reduce((acc, conn) => {
// //     const month = conn.dateOfApplication.slice(0, 7);
// //     acc[month] = (acc[month] || 0) + 1;
// //     return acc;
// //   }, {});

// //   const chartData = Object.entries(dataByMonth).map(([month, count]) => ({
// //     month,
// //     count
// //   }));

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl mb-4">Connection Requests by Month</h1>

// //       <div className="mb-4">
// //         <select
// //           value={statusFilter}
// //           onChange={(e) => setStatusFilter(e.target.value)}
// //           className="border p-2"
// //         >
// //           <option>All</option>
// //           <option>Pending</option>
// //           <option>Approved</option>
// //         </select>
// //       </div>

// //       <BarChart width={600} height={400} data={chartData}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="month" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Bar dataKey="count" fill="#8884d8" />
// //       </BarChart>
// //     </div>
// //   );
// // }



// 'use client';

// import { useEffect, useState } from 'react';
// import Chart from '../../components/Chart';

// export default function ChartsPage() {
//   const [connections, setConnections] = useState([]);

//   useEffect(() => {
//     fetch('/api/connections')
//       .then(res => res.json())
//       .then(data => setConnections(data));
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Connection Requests - Monthly Overview</h1>
//       <Chart connections={connections} />
//     </div>
//   );
// }


'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// ✅ Dynamically load Chart component and disable SSR
const Chart = dynamic(() => import('../../components/Chart'), { ssr: false });

export default function ChartsPage() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await fetch('/api/connections');
      const data = await res.json();
      setConnections(data);
    };

    fetchConnections();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Connection Requests - Monthly Overview</h1>
      <Chart connections={connections} />
    </div>
  );
}
