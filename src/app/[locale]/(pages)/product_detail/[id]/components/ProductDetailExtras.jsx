import ProductDetailReviews from "./ProductDetailReviews";
import RelatedProducts from "./RelatedProducts";

const ProductDetailExtras = ({ product, locale, reviewProps }) => (
  <>
    <ProductDetailReviews
      comments={reviewProps.comments}
      productTitle={product.title?.[locale] || product.title?.fr}
      rating={reviewProps.rating}
      review={reviewProps.review}
      name={reviewProps.name}
      email={reviewProps.email}
      onRatingChange={reviewProps.onRatingChange}
      onFieldChange={reviewProps.onFieldChange}
      onSubmit={reviewProps.onSubmit}
      isSubmitting={reviewProps.isSubmitting}
    />

    <div className="px-4 sm:px-6 lg:px-8">
      <RelatedProducts productId={product._id} />
    </div>
  </>
);

export default ProductDetailExtras;
