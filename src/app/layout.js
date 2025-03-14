import './globals.css';

export const metadata = {
  title: 'Electricity Board Staff Portal',
  description: 'Manage electricity connection applications',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 font-sans">{children}</body>
    </html>
  );
}
