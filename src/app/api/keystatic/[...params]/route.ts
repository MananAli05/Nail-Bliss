import { makeRouteHandler } from "@keystatic/next/route-handler";
import { adminEnabled } from "@/lib/admin";
import config from "../../../../../keystatic.config";

const handler = adminEnabled ? makeRouteHandler({ config }) : null;
const notFound = () => new Response("Not Found", { status: 404 });

export function GET(request: Request) {
  return handler ? handler.GET(request) : notFound();
}

export function POST(request: Request) {
  return handler ? handler.POST(request) : notFound();
}
