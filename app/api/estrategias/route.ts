import { NextResponse } from "next/server";
import { estrategias } from "@/data/estrategias";

export async function GET() {
  return NextResponse.json(estrategias);
}
