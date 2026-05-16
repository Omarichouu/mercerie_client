import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongodb";

import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request) {

  // 2 connect to DB
  await connectMongoDB();

// 3- Delete data
// 2- get data 

const arr_data = await ProductModal.find({})


// const arr_data = await ProductModal.find({disponible:"disponible"})
// .sort({ purchaseCount: -1 })
// .limit(15); // Limite à 10 produits les plus achetés



  // 4- Go back to frontend
  return NextResponse.json(arr_data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}


