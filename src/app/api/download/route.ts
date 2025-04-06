// app/api/download/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response("No image URL provided", { status: 400 });
  }

  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const buffer = await res.arrayBuffer();

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="wallpaper.jpg"`,
      },
    });
  } catch {
    return new Response("Something went wrong", { status: 500 });
  }
}
