import CommentsModal from "app/DBconfig/models/Commente";
import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const serializeComment = (comment) => ({
  ...comment,
  _id: comment._id?.toString?.() || comment._id,
  id_product: comment.id_product?.toString?.() || comment.id_product,
});

export async function GET(request) {
  await connectMongoDB();

  const id = request.nextUrl.searchParams.get("id");
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  const product = await ProductModal.findById(id)
    .select("comments")
    .lean();

  const commentIds = Array.isArray(product?.comments) ? product.comments : [];
  const query = commentIds.length
    ? { $or: [{ id_product: id }, { _id: { $in: commentIds } }] }
    : { id_product: id };

  const comments = await CommentsModal.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(comments.map(serializeComment));
}
