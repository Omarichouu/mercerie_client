import ProductCard from "components/product/ProductCard";

const CategoryGrid = ({ cards, viewMode }) => (
  <div
    className={`grid gap-3 sm:gap-4 lg:gap-6 ${
      viewMode === "grid"
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1"
    }`}
  >
    {cards.map((card, index) => (
      <ProductCard
        key={card.id || index}
        card={card}
        imageLoading={index < 4 ? "eager" : "lazy"}
      />
    ))}
  </div>
);

export default CategoryGrid;
