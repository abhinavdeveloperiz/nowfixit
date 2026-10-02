import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products, formatPrice } from "../data/products";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

function Home() {
  const banners = [
    "https://ronixtools.com/en/blog/wp-content/uploads/2023/06/A-collection-of-power-tools-drill-screwdriver-circular-saw-jigsaw.webp",
    "https://www.toptiertool.com/wp-content/uploads/2023/12/A-variety-of-power-tools-on-a-workbench.webp",
  ];

  const featuredProducts = products.slice(0, 5);

  const categories = [
    {
      title: "Hand Tools",
      description: "Built for every job",
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
    },
    {
      title: "Accessories",
      description: "Parts & essentials",
      image:
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&q=80",
    },
    {
      title: "Safety Equipment",
      description: "Work safe, work smart",
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80",
    },
    {
      title: "Power Tools",
      description: "Drills, saws & more",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="bg-white">
      {/* ================= BANNER ================= */}
      <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Slides */}
          <div
            className="flex h-[20vh] min-h-[180px] md:h-[50vh] md:min-h-[350px] transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <div key={index} className="h-full min-w-full">
                <img
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Previous */}
          <button
            onClick={previousSlide}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:left-5 sm:h-10 sm:w-10"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 sm:right-5 sm:h-10 sm:w-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === index ? "w-7 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORY CARDS ================= */}
      {/* Cards */}
      <div className="flex gap-6 overflow-x-auto py-2 scrollbar-hide sm:gap-8 mx-2 md:mx-12">
        {categories.map((category) => {
          return (
            <Link
              key={category.title}
              to="/products"
              className="group flex min-w-[90px] shrink-0 flex-col items-center text-center"
            >
              {/* Circular Image */}
              <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-black sm:h-24 sm:w-24">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category Name */}
              <h3 className="mt-3 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-500">
                {category.title}
              </h3>
            </Link>
          );
        })}
      </div>

      <section className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Section Heading */}
        <div className="my-6 flex items-center justify-between gap-4 text-left">
          {/* Left Content */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Our Products
            </p>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl uppercase">
              Featured Products
            </h2>
          </div>

          {/* Right Button */}
          <Link
          to="/products"
            className="flex shrink-0 items-center gap-2 rounded-full pt-8 underline px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
        {/* Product List */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link
                  to={`/products/${product.id}`}
                  aria-label={`View ${product.name}`}
                  className="block h-full w-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Discount */}
                {product.discount && (
                  <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <Heart size={15} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4">
                {/* Category */}
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  {product.category}
                </p>

                {/* Name */}
                <Link
                  to={`/products/${product.id}`}
                  className="block truncate text-sm font-semibold text-gray-900 hover:underline"
                >
                  {product.name}
                </Link>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>

                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <Link
                  to={`/products/${product.id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-gray-800"
                >
                  <ShoppingCart size={15} />
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
