import Link from 'next/link';
import { useState } from 'react';

export default function ConnectionForm({ connection, router }) {
  const [form, setForm] = useState(connection);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.loadApplied > 200) {
      alert('Load applied cannot exceed 200 KV');
      return;
    }

    await fetch(`/api/connections/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    router.push('/table');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center mx-[33%] mt-14 ">
      <div>
        <label>Applicant Name</label>
        <input
          type="text"
          value={form.applicantName}
          onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Load Applied (KV)</label>
        <input
          type="number"
          value={form.loadApplied}
          onChange={(e) => setForm({ ...form, loadApplied: Number(e.target.value) })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 w-full"
        >
          <option className='text-black'>Pending</option>
          <option className='text-black'>Approved</option>
          <option className='text-black'>Rejected</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-900">Save</button>
      <Link href='/'>
        <div className='bg-white text-black rounded-md p-2 text-center hover:bg-black hover:text-white'>
          Back to Home
        </div>
      </Link>
    </form>
  );
}
