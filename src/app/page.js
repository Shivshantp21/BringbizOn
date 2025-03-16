import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

export default function DashboardPage() {

  return (
    <div className=" ">
      <main className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <div className="flex-1 px-4 md:px-16 py-8">
          <HeroSection />
        </div>
      </main>
    </div>
  );
}
