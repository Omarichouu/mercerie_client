import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { addComment, fetchProductComments, linkCommentToProduct } from "../product.api";

export const useProductReviews = ({ productId, initialComments = [], t }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadFreshComments = async () => {
      if (!productId) return;
      try {
        const fresh = await fetchProductComments(productId);
        if (isActive && Array.isArray(fresh)) {
          setComments(fresh);
        }
      } catch (error) {
        console.warn("Failed to refresh comments", error);
      }
    };

    loadFreshComments();

    return () => {
      isActive = false;
    };
  }, [productId]);

  const handleFieldChange = useCallback((event) => {
    const { name: fieldName, value } = event.target;
    if (fieldName === "name") setName(value);
    if (fieldName === "email") setEmail(value);
    if (fieldName === "review") setReview(value);
  }, []);

  const handleSubmitReview = useCallback(
    async (event) => {
      event.preventDefault();
      const numericRating = Number(rating) || 0;
      if (!name || !email || !review || numericRating < 1) {
        toast.error(t("fillAllFields"));
        return;
      }

      setIsSubmittingReview(true);
      const newComment = {
        id_product: productId,
        name,
        email,
        rating: Math.min(5, Math.max(1, numericRating)),
        avis: review,
        createdAt: new Date().toISOString(),
      };

      try {
        const commentResponse = await addComment(newComment);
        await linkCommentToProduct({
          productId,
          commentId: commentResponse._id,
        });

        try {
          const fresh = await fetchProductComments(productId);
          if (Array.isArray(fresh)) {
            setComments(fresh);
          } else {
            setComments((prev) => [...prev, newComment]);
          }
        } catch (error) {
          console.warn("Failed to reload comments after submit", error);
          setComments((prev) => [...prev, newComment]);
        }
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
