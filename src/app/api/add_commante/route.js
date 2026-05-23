import CommentsModal from "app/DBconfig/models/Commente";
import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongodb";
import { NextResponse } from "next/server";



// type objFromFrontEnd={
//  id_product
// value_start
// description
// }


export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();

  // 2 connect to DB
  await connectMongoDB();

  // 3- add data

  const my_data = await CommentsModal.create({
   id_product: objFromFrontEnd.id_product,
   name: objFromFrontEnd.name,
   email: objFromFrontEnd.email,
   avis: objFromFrontEnd.avis || objFromFrontEnd.review || "",
   rating: Number(objFromFrontEnd.rating) || 1,
  });


  // 4- Go back to frontend
  return NextResponse.json(my_data);
}
