import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { addComment, linkCommentToProduct } from "../product.api";

export const useProductReviews = ({ productId, initialComments = [], t }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleFieldChange = useCallback((event) => {
    const { name: fieldName, value } = event.target;
    if (fieldName === "name") setName(value);
    if (fieldName === "email") setEmail(value);
    if (fieldName === "review") setReview(value);
  }, []);

  const handleSubmitReview = useCallback(
    async (event) => {
      event.preventDefault();
      if (!name || !email || !review) {
        toast.error(t("fillAllFields"));
        return;
      }

      setIsSubmittingReview(true);
      const newComment = {
        name,
        email,
        rating,
        avis: review,
        createdAt: new Date().toISOString(),
      };

      try {
        const commentResponse = await addComment(newComment);
        await linkCommentToProduct({
          productId,
          commentId: commentResponse._id,
        });

        setComments((prev) => [...prev, newComment]);
        setName("");
        setEmail("");
        setReview("");
        setRating(0);
        toast.success(t("thankYouForReview"));
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.error(t("failedToAddComment"));
      } finally {
        setIsSubmittingReview(false);
      }
    },
    [email, name, productId, rating, review, t]
  );

  return {
    comments,
    rating,
    review,
    name,
    email,
    isSubmittingReview,
    onRatingChange: setRating,
    onFieldChange: handleFieldChange,
    onSubmitReview: handleSubmitReview,
  };
};
