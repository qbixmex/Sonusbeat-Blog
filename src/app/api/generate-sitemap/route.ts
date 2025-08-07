import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const execAsync = promisify(exec)

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 })
  }

  try {
    const { stdout, stderr } = await execAsync('npx next-sitemap')
    if (stderr) console.error('stderr:', stderr)

    return NextResponse.json({ ok: true, stdout })
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message
      },
      {
        status: 500
      },
    );
  }
};
