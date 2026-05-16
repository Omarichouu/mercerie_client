import { connectMongoDB } from "app/DBconfig/mongodb";
import ProductModal from "app/DBconfig/models/product";
import { NextResponse } from "next/server";
import Price_minModal from "app/DBconfig/models/price_minimum";

export async function PUT(request) {
  try {
    const objFromFrontEnd = await request.json();
    await connectMongoDB();

  
    await Price_minModal.updateOne(
      { role: "price" },
      {
        price_min: objFromFrontEnd.price_minimum
      }
    );



    

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
