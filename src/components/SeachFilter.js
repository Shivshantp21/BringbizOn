export default function SearchFilter({ searchId, setSearchId, dateRange, setDateRange }) {
    return (
      <div className="flex gap-2 ">
        <input
          type="text"
          placeholder="Search by Applicant ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
          className="border p-2 rounded text-white"
        />
        <input
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
          className="border p-2 rounded"
        />
      </div>
    );
  }
  