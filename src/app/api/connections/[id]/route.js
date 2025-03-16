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

export async function GET(req, context) {
  const params = await context.params; 
  
  const connections = readConnections();
  const connection = connections.find(c => c.id === params.id);

  if (!connection) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(connection);
}

export async function PUT(req, context) {
  const params = await context.params; // ✅ FIXED: Await the promise
  
  const updatedData = await req.json();
  const connections = readConnections();

  const index = connections.findIndex(c => c.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  if (updatedData.loadApplied > 200) {
    return NextResponse.json({ error: 'Load applied cannot exceed 200 KV' }, { status: 400 });
  }

  connections[index] = { ...connections[index], ...updatedData };

  writeConnections(connections);

  return NextResponse.json(connections[index]);
}
