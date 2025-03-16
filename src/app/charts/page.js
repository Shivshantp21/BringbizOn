'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
    <div className="p-8 bg-gray-900 text-white h-screen ">
      <h1 className="text-2xl font-bold mb-4">Connection Requests - Monthly Overview</h1>
      <Chart connections={connections} />
    </div>
  );
}
