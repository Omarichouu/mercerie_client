import CategoryHero from "./CategoryHero";
import CategoryItemsScroller from "./CategoryItemsScroller";

const CategoryHeader = ({
  hero,
  heroTitle,
  heroSubtitle,
  heroThumbnailAlt,
  scrollerItems,
  scrollerHeading,
  locale,
  isSubCategoryList,
  selectedSubCategory,
  onSubCategorySelect,
}) => (
  <div className="relative">
    <CategoryHero
      backgroundImage={hero.backgroundImage}
      thumbnailImage={hero.thumbnailImage}
      title={heroTitle}
      subtitle={heroSubtitle}
      thumbnailAlt={heroThumbnailAlt}
    />

    <CategoryItemsScroller
      items={scrollerItems}
      locale={locale}
      heading={scrollerHeading}
      isSubCategoryList={isSubCategoryList}
      selectedSubCategory={selectedSubCategory}
      onSubCategorySelect={onSubCategorySelect}
    />
  </div>
);

export default CategoryHeader;
