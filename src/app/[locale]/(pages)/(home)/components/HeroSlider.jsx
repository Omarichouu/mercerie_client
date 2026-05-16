import Image from "next/image";
import { Link } from "i18n/navigation";

const HeroSlider = ({ slides, locale, currentSlide, onSelectSlide }) => (
  <section className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] overflow-hidden mb-8 sm:mb-12 lg:mb-16 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl">
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.img}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 via-gray-800/50 to-gray-800/70 z-10 rounded-lg sm:rounded-2xl"></div>
          <Image
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover rounded-lg sm:rounded-2xl"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
              margin: "0 auto",
            }}
            quality={80}
            fill
            sizes="100vw"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl lg:max-w-2xl">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight text-white bg-clip-text">
                  {locale === "fr" ? slide.title : slide.title_ar}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 lg:mb-8 font-light">
                  {locale === "fr" ? slide.subtitle : slide.subtitle_ar}
                </p>

                <Link
                  href={`/product_category/${slide.link_url}`}
                  className="bg-gradient-to-r from-[var(--or_color)] via-[var(--or_color2)] to-yellow-600 text-white px-4 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg sm:shadow-2xl text-xs sm:text-sm lg:text-base font-semibold hover:shadow-yellow-500/25"
                  style={{
                    "--or_color": "#D4AF37",
                    "--or_color2": "#FFD700",
                  }}
                >
                  {locale === "fr" ? slide.cta : slide.cta_ar}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
      {slides.map((slide, index) => (
        <button
          key={slide.img}
          onClick={() => onSelectSlide(index)}
          aria-label={`Slide ${index + 1}`}
          className={`w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "bg-[#D4AF37] scale-125 shadow-lg shadow-yellow-500/50"
              : "bg-white/50 hover:bg-white/75"
          }`}
        />
      ))}
    </div>
  </section>
);

export default HeroSlider;
