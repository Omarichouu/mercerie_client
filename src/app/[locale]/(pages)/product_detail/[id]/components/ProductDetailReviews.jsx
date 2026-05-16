import CustomerReviews from "components/product-detail/CustomerReviews";

const ProductDetailReviews = ({
  comments,
  productTitle,
  rating,
  review,
  name,
  email,
  onRatingChange,
  onFieldChange,
  onSubmit,
  isSubmitting,
}) => (
  <div className="px-4 sm:px-6 lg:px-8">
    <CustomerReviews
      comments={comments}
      productTitle={productTitle}
      rating={rating}
      review={review}
      name={name}
      email={email}
      onRatingChange={onRatingChange}
      onFieldChange={onFieldChange}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  </div>
);

export default ProductDetailReviews;
