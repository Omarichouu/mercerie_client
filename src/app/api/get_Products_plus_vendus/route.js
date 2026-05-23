import { getTopProducts } from "lib/top-products";
import { NextResponse } from "next/server";


export async function GET(request) {

const arr_data = await getTopProducts();


  // 4- Go back to frontend with cache headers for CDN / proxy
  const res = NextResponse.json(arr_data);
  res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  return res;
}


