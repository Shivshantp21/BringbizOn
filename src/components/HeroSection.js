import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="text-center mt-4 flex justify-center flex-col items-center">
      <div className="inline-block mb-4 bg-gray-100 text-black px-3 py-1 rounded-full text-xl font-bold">
        Pay Your Bills In One Go
      </div>
      <h1 className="text-4xl mt-4 md:text-5xl font-bold mb-4 text-center mx-20">
        Check <span className="text-blue-600">Electrical</span> approvals 
        Or Rejections  by the help of BillBoard 
      </h1>
      <p className="text-gray-600 mb-9 text-lg">
        Check,Set and Approve the bills in BillBoard { }
        <Link href="/table" className="text-blue-600 underline">
          Check It Out
        </Link>
      </p>
      <Image src="https://media.istockphoto.com/id/1492400949/vector/electricity-bill-on-laptop-screen.jpg?s=612x612&w=0&k=20&c=KcxaMQOaCa7R5INZsvc9U82rnBYFbGdOap9dfn4qIOo=" alt='Image' width='450' height={100} className=""/>

    </section>
  );
}
