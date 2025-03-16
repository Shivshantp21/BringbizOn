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
    <div className="p-8 bg-gray-900 text-white h-screen ">
      <p className="text-3xl font-bold mb-4 text-center">Edit Connection</p>
      <p className="text-2xl font-bold mb-4 text-center">Customer ID - {connection.applicantId}</p>
      <ConnectionForm connection={connection} router={router} />
    </div>
  );
}
