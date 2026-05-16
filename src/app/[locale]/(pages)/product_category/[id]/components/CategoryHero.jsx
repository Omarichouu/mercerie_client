import Image from "next/image";

const CategoryHero = ({
  backgroundImage,
  thumbnailImage,
  title,
  subtitle,
  thumbnailAlt,
}) => (
  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-r rounded-t-lg">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-800/40 to-gray-800/50 z-10 rounded-lg sm:rounded-2xl"></div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-0">
          <div className="mx-auto mb-4 relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm ring-4 ring-white/30 ring-offset-2 ring-offset-amber-400/50">
              <Image
                src={thumbnailImage}
                alt={thumbnailAlt}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 192px"
                loading="lazy"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h1>

          <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium drop-shadow">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryHero;
