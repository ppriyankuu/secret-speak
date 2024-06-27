import { suggestions } from '@/lib/suggestions';
import { NextRequest, NextResponse } from 'next/server';

function getRandomElements(a: string[], count: number) {
  const shuffled = a.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const GET = (req: NextRequest) => {
  const randomMessages = getRandomElements(suggestions, 3);
  return NextResponse.json(randomMessages, { status: 200 });
};
