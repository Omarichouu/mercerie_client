import CartModal from "app/DBconfig/models/Cart";
import ProductModal, { db } from "app/DBconfig/models/product";
import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {


    // 1- Receive data from Front-end
    const objFromFrontEnd = await request.json();

    // 1- connect to DB
    await connectMongoDB();

    // 2- get data 
    if (!objFromFrontEnd?.id_user || !mongoose.Types.ObjectId.isValid(objFromFrontEnd.id_user)) {
      return NextResponse.json([], { status: 200 });
    }

    const cart_client = await CartModal.find({ id_user: objFromFrontEnd.id_user })
      .populate("id_product")
      .lean();

  


      // 4- Go back to frontend
  return NextResponse.json( cart_client );

}
