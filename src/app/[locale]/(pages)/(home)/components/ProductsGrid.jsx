import ProductCard from "components/product/ProductCard";

const ProductsGrid = ({ cards, viewMode }) => {
  const gridClass =
    viewMode === "grid"
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-1";

  return (
    <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${gridClass}`}>
      {cards.map((card, index) => (
        <ProductCard
          key={card.id || index}
          card={card}
          imageLoading={index < 4 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
