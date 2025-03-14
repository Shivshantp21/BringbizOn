// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';

// export default function EditConnection() {
//   const params = useParams();
//   const router = useRouter();
//   const [connection, setConnection] = useState(null);
//   const [loadApplied, setLoadApplied] = useState('');

//   useEffect(() => {
//     fetch(`/api/connections/${params.id}`)
//       .then(res => res.json())
//       .then(data => {
//         setConnection(data);
//         setLoadApplied(data.loadApplied);
//       });
//   }, [params.id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (loadApplied > 200) {
//       alert('Load applied cannot exceed 200 KV');
//       return;
//     }

//     await fetch(`/api/connections/${params.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...connection, loadApplied })
//     });

//     router.push('/');
//   };

//   if (!connection) return <p>Loading...</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl mb-4">Edit Connection - {connection.applicantId}</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label>Applicant Name</label>
//           <input
//             type="text"
//             value={connection.applicantName}
//             onChange={(e) => setConnection({ ...connection, applicantName: e.target.value })}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Load Applied (KV)</label>
//           <input
//             type="number"
//             value={loadApplied}
//             onChange={(e) => setLoadApplied(Number(e.target.value))}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="flex gap-4">
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//           <button type="button" onClick={() => router.push('/')} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ConnectionForm from '../../../components/ConnectionForm';

export default function EditConnectionPage() {
  const params = useParams();
  const router = useRouter();

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    fetch(`/api/connections/${params.id}`)
      .then(res => res.json())
      .then(data => setConnection(data));
  }, [params.id]);

  if (!connection) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Connection - {connection.applicantId}</h1>
      <ConnectionForm connection={connection} router={router} />
    </div>
  );
}
