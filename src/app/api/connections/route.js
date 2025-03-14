// import { NextResponse } from 'next/server';

// let connections = [
//   {
//     id: '1',
//     applicantId: 'APPL001',
//     applicantName: 'Rajesh Kumar',
//     govtIdType: 'Aadhar',
//     govtIdNumber: '1234-5678-9012',
//     loadApplied: 150,
//     status: 'Pending',
//     dateOfApplication: '2024-12-15'
//   },
//   {
//     id: '2',
//     applicantId: 'APPL002',
//     applicantName: 'Sita Devi',
//     govtIdType: 'PAN',
//     govtIdNumber: 'ABCDE1234F',
//     loadApplied: 75,
//     status: 'Approved',
//     dateOfApplication: '2025-01-10'
//   },
//   // more mock data...
// ];

// export async function GET() {
//   return NextResponse.json(connections);
// }

// export async function POST(req) {
//   const newConnection = await req.json();

//   // Validation: loadApplied ≤ 200
//   if (newConnection.loadApplied > 200) {
//     return NextResponse.json({ error: 'Load applied cannot exceed 200 KV' }, { status: 400 });
//   }

//   const newEntry = {
//     ...newConnection,
//     id: `${connections.length + 1}`,
//     dateOfApplication: new Date().toISOString().split('T')[0] // today
//   };

//   connections.push(newEntry);
//   return NextResponse.json(newEntry, { status: 201 });
// }


// import { NextResponse } from 'next/server';

// import connections from '@/data/connections';

// export async function GET() {
//   return NextResponse.json(connections);
// }

// export async function POST(req) {
//   const newConnection = await req.json();

//   if (newConnection.loadApplied > 200) {
//     return NextResponse.json({ error: 'Load applied cannot exceed 200 KV' }, { status: 400 });
//   }

//   const newEntry = {
//     ...newConnection,
//     id: `${connections.length + 1}`,
//     dateOfApplication: new Date().toISOString().split('T')[0]
//   };

//   connections.push(newEntry);
//   return NextResponse.json(newEntry, { status: 201 });
// }



import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/connections.json');

// Read data from JSON file
const readConnections = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

// Write updated data to JSON file
const writeConnections = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const connections = readConnections();
  return NextResponse.json(connections);
}

export async function POST(req) {
  const connections = readConnections();
  const newConnection = await req.json();

  if (newConnection.loadApplied > 200) {
    return NextResponse.json({ error: 'Load applied cannot exceed 200 KV' }, { status: 400 });
  }

  const newEntry = {
    ...newConnection,
    id: `${connections.length + 1}`,
    dateOfApplication: new Date().toISOString().split('T')[0]
  };

  connections.push(newEntry);
  writeConnections(connections); // ✅ Persist the updated array

  return NextResponse.json(newEntry, { status: 201 });
}
