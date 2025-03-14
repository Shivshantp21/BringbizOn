// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Dashboard() {
//   const [connections, setConnections] = useState([]);
//   const [searchId, setSearchId] = useState('');

//   useEffect(() => {
//     fetch('/api/connections')
//       .then(res => res.json())
//       .then(data => setConnections(data));
//   }, []);

//   const filtered = connections.filter(conn =>
//     conn.applicantId.toLowerCase().includes(searchId.toLowerCase())
//   );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Electricity Connections Dashboard</h1>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by Applicant ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="border p-2 mr-2 rounded"
//         />
//         <Link href="/charts" className="bg-blue-500 text-white px-4 py-2 rounded">View Charts</Link>
//       </div>

//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Applicant ID</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Govt ID</th>
//             <th className="border p-2">Load (KV)</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map(conn => (
//             <tr key={conn.id}>
//               <td className="border p-2">{conn.applicantId}</td>
//               <td className="border p-2">{conn.applicantName}</td>
//               <td className="border p-2">{conn.govtIdNumber}</td>
//               <td className="border p-2">{conn.loadApplied} KV</td>
//               <td className="border p-2">{conn.status}</td>
//               <td className="border p-2">
//                 <Link href={`/connection/${conn.id}`} className="text-blue-500 underline">View / Edit</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// 'use client';

// import ConnectionTable from '../components/ConnectionTable';
// import SearchFilter from '../components/SeachFilter';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const [connections, setConnections] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [dateRange, setDateRange] = useState({ from: '', to: '' });

//   useEffect(() => {
//     fetch('/api/connections')
//       .then(res => res.json())
//       .then(data => setConnections(data));
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Electricity Connections Dashboard</h1>
//       <div className="flex justify-between mb-4">
//         <SearchFilter
//           searchId={searchId}
//           setSearchId={setSearchId}
//           dateRange={dateRange}
//           setDateRange={setDateRange}
//         />
//         <Link href="/charts" className="bg-blue-500 text-white px-4 py-2 rounded">View Charts</Link>
//       </div>
//       <ConnectionTable
//         connections={connections}
//         searchId={searchId}
//         dateRange={dateRange}
//       />
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConnectionTable from '../components/ConnectionTable';
import SearchFilter from '../components/SeachFilter'; // ✅ Fixed typo

export default function DashboardPage() {
  const [connections, setConnections] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false); // ✅ Optional: Add a loading state

  // ✅ Fetch connections (single function to reuse)
  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/connections');
      const data = await res.json();
      setConnections(data);
    } catch (error) {
      console.error('Failed to fetch connections:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch connections on mount
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Electricity Connections Dashboard</h1>

      {/* ✅ Search and Filter */}
      <div className="flex justify-between mb-4 items-center">
        <SearchFilter
          searchId={searchId}
          setSearchId={setSearchId}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <div className="flex gap-2">
          <button
            onClick={fetchConnections}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>

          <Link href="/charts" className="bg-blue-500 text-white px-4 py-2 rounded">
            View Charts
          </Link>
        </div>
      </div>

      {/* ✅ Connection Table */}
      <ConnectionTable
        connections={connections}
        searchId={searchId}
        dateRange={dateRange}
      />
    </div>
  );
}
