import { NextResponse } from 'next/server';
import incusClient from '../../_lib/incus';

export async function POST(request) {
  try {
    const { name, description, source, instance_type, start } = await request.json();
    let incus = incusClient("https://188.245.72.127:8443");

    const response = await incus.post("/instances", {
      name,
      description,
      source,
      instance_type,
      start
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error creating instance:', error);
    return NextResponse.json({ error: 'Error creating instance' }, { status: 500 });
  }
}
