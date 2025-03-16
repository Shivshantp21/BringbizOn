'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConnectionTable from '@/components/ConnectionTable';
import SearchFilter from '@/components/SeachFilter';

export default function DashboardPage() {
  const [connections, setConnections] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false);

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
  
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className=" ">
      <main className="p-8 bg-gray-900 text-white">
        <div className='flex justify-between'>
        <h1 className='text-3xl mb-4'> BillBoard </h1>
        <Link href='/'>
          <div className='text-lg bg-white text-black p-2 rounded-md'>
            Back to Home
          </div>
        </Link>
        </div>
        <p className='text-lg mb-4'> Search/Edit applicant by there applicant Id or find them through the date</p>
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
        <ConnectionTable
          connections={connections}
          searchId={searchId}
          dateRange={dateRange}
        />
      </main>
    </div>
  );
}
