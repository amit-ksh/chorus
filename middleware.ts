import { NextRequest, NextResponse } from 'next/server';

const signedinPages = ['/', '/playlist'];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get('TRAX_ACCESS_TOKEN');

    if (!token?.value) {
      const url = req.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }
}