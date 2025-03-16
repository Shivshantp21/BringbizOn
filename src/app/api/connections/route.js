import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/connections.json');

const readConnections = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

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
