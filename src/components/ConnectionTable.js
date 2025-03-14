import Link from 'next/link';

export default function ConnectionTable({ connections, searchId, dateRange }) {
  const filtered = connections.filter(conn => {
    const matchesSearch = conn.applicantId.toLowerCase().includes(searchId.toLowerCase());
    const appDate = new Date(conn.dateOfApplication);
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;

    const matchesDate = (!from || appDate >= from) && (!to || appDate <= to);

    return matchesSearch && matchesDate;
  });

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-200 text-black">
          <th className="border p-2">Applicant ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Govt ID</th>
          <th className="border p-2">Load (KV)</th>
          <th className="border p-2">Status</th>
            <th className="border p-2">Date of Application</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody className='text-black'>
        {filtered.map(conn => (
          <tr key={conn.id}>
            <td className="border p-2">{conn.applicantId}</td>
            <td className="border p-2">{conn.applicantName}</td>
            <td className="border p-2">{conn.govtIdNumber}</td>
            <td className="border p-2">{conn.loadApplied} KV</td>
            <td className="border p-2">{conn.status}</td>
            <td className="border p-2">{conn.dateOfApplication}</td>
            <td className="border p-2">
              <Link href={`/connection/${conn.id}`} className="text-blue-500 underline">View/Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
