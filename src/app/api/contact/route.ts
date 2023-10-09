import { NextResponse } from "next/server";
import { headers } from 'next/headers'
interface RequestParams extends Request {
  action: string;
}
export async function POST(request: RequestParams) {
  try {
    const req = await request.json();
    const res = await fetch(`${process.env.SHEET_API}?action=${req.action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    console.log(req.email);
    
    if (res.ok)
      return new Response("working", {
        status: 200,
      });
    return new Response("nope", {
      status: 500,
    });
  } catch (error) {
    return new Response("nope", {
      status: 500,
    });
  }
}
