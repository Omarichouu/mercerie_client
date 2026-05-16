// // // export { default } from "next-auth/middleware";

// // import { withAuth } from "next-auth/middleware";

// // export default withAuth({
// //   pages: {
// //     signIn: "/login",
// //   },
// // });

// // export const config = {
// //   matcher: [
// //     // "/historique",
// //     // "/cart",
// //     // "/profile",
    
// //   ],
// // };


// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(fr|ar)/:path*']
// };



import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function applyCors(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

export default function middleware(request) {
  if (request.method === "OPTIONS") {
    return applyCors(NextResponse.json({}, { status: 200 }));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(fr|ar)/:path*"],
};