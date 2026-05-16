// // // app/DBconfig/api/get_product_by_category/route.js
// // import ProductModal from "app/DBconfig/models/product";
// // import { connectMongoDB } from "app/DBconfig/mongodb";
// // import { NextResponse } from "next/server";

// // export async function GET(request) {
// //   try {
// //     await connectMongoDB();

// //     const category_produit = request.nextUrl.searchParams.get("id");
// //     const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
// //     const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 12;

// //     // Calculer le skip pour la pagination
// //     const skip = (page - 1) * limit;

// //     // Récupérer les données avec pagination
// //     const products = await ProductModal.find({ 
// //       categorie: category_produit, 
// //       disponible: "disponible" 
// //     })
// //     .skip(skip)
// //     .limit(limit)
// //     .lean();

// //     // Compter le nombre total de produits pour cette catégorie
// //     const totalProducts = await ProductModal.countDocuments({ 
// //       categorie: category_produit, 
// //       disponible: "disponible" 
// //     });

// //     // Calculer le nombre total de pages
// //     const totalPages = Math.ceil(totalProducts / limit);

// //     return NextResponse.json({ 
// //       products, 
// //       pagination: {
// //         currentPage: page,
// //         totalPages,
// //         totalProducts,
// //         hasNext: page < totalPages,
// //         hasPrev: page > 1
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Error fetching products:", error);
// //     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
// //   }
// // }


// // app/DBconfig/api/get_product_by_category/route.js
// import ProductModal from "app/DBconfig/models/product";
// import { connectMongoDB } from "app/DBconfig/mongodb";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     const category_produit = request.nextUrl.searchParams.get("id");
//     const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
//     const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 12;
//     const searchTerm = request.nextUrl.searchParams.get("search") || "";

//     // Calculer le skip pour la pagination
//     const skip = (page - 1) * limit;

//     // Construire la requête de recherche
//     let query = { 
//       categorie: category_produit, 
//       disponible: "disponible" 
//     };

//     // Ajouter la recherche si un terme est fourni
//     if (searchTerm) {
//       query.$or = [
//         { "title.fr": { $regex: searchTerm, $options: "i" } },
//         { "title.ar": { $regex: searchTerm, $options: "i" } }
//       ];
//     }

//     // Récupérer les données avec pagination
//     const products = await ProductModal.find(query)
//       .sort({ "title.fr": 1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // Compter le nombre total de produits pour cette catégorie
//     const totalProducts = await ProductModal.countDocuments(query);

//     // Calculer le nombre total de pages
//     const totalPages = Math.ceil(totalProducts / limit);

//     return NextResponse.json({ 
//       products, 
//       pagination: {
//         currentPage: page,
//         totalPages,
//         totalProducts,
//         hasNext: page < totalPages,
//         hasPrev: page > 1
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }



// app/DBconfig/api/get_product_by_category/route.js
import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoDB();
    const category_produit = request.nextUrl.searchParams.get("id");
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 12;
    const searchTerm = request.nextUrl.searchParams.get("search") || "";
    const sortBy = request.nextUrl.searchParams.get("sortBy") || "name";
    const subCategory = request.nextUrl.searchParams.get("sub") || "";
    
    // Calculer le skip pour la pagination
    const skip = (page - 1) * limit;
    
    // Construire la requête de recherche dans mon category
    let query = { 
      categorie: category_produit
    };

    if (subCategory) {
      query.subCategory = subCategory;
    }

   //Construire la requête de recherche dans tout les category si  searchTerm exist 
    //   let query = { }

    //  if (!searchTerm && category_produit) {
    //   query.categorie = category_produit;
    // }
    
    
    // Ajouter la recherche si un terme est fourni
    if (searchTerm) {
      query.$or = [
        { "title.fr": { $regex: searchTerm, $options: "i" } },
        { "title.ar": { $regex: searchTerm, $options: "i" } }
      ];
    }
    
    // Définir l'ordre de tri
    let sortQuery = {};
    switch (sortBy) {
      case "price-asc":
        sortQuery = { price: 1 };
        break;
      case "price-desc":
        sortQuery = { price: -1 };
        break;
      case "name":
      default:
        sortQuery = { "title.fr": 1 };
        break;
    }
    
    // Projection: retourner seulement les champs nécessaires pour alléger la réponse
    const projection = {
      title: 1,
      price: 1,
      ancien_price: 1,
      array_ProductImg: 1,
      disponible: 1,
      categorie: 1,
      rating: 1,
      variant: 1,
      variant_color: 1,
    };

    // Exécuter la requête et le comptage en parallèle pour gagner du temps
    const [products, totalProducts] = await Promise.all([
      ProductModal.find(query).sort(sortQuery).skip(skip).limit(limit).select(projection).lean(),
      ProductModal.countDocuments(query),
    ]);
    
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalProducts / limit);
    
    const response = NextResponse.json({ 
      products, 
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

    // Cache côté CDN / Vercel pour réduire les appels à la DB
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
