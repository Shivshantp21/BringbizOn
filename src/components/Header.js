
import Link from "next/link";

export default function Header() {

  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-16 border-b">
      <div className="flex items-center gap-10">
        <div className="text-3xl font-bold font-serif">BillBoard</div>
        <nav className="hidden md:flex gap-6 text-gray-200 text-lg">
          <Link href={`/table`}>
              Billings
          </Link>
          <Link href={`/charts`}>
              Charts
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4 text-lg">
        <button className=" text-gray-200">Login</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Get started
        </button>
      </div>
    </header>
  );
}
