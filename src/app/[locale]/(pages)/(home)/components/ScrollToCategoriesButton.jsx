const ScrollToCategoriesButton = ({ t, onClick }) => (
  <div className="flex justify-center mt-8 sm:mt-12">
    <button
      onClick={onClick}
      className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-sm font-semibold text-white bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#C9A227] hover:to-[#E6C200] transition-all duration-300 shadow-md hover:shadow-lg"
    >
      {t("voirCategories")}
    </button>
  </div>
);

export default ScrollToCategoriesButton;
