import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { formatPrice, products } from "../data/products";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const categories = [
    "All",
    "Power Tools",
    "Hand Tools",
    "Accessories",
    "Safety Equipment",
  ];

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedCategory, sortBy]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <section className="mx-auto px-6 py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tools and essentials"
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-500"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((visible) => !visible)}
              className="flex h-12 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Categories
            </button>
            <label className="flex h-12 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-600">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="bg-transparent font-medium text-gray-900 outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <div
          className={`${showFilters ? "flex" : "hidden"} mt-5 flex-wrap gap-2 lg:flex`}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setShowFilters(false);
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 flex items-end justify-between border-b border-gray-200 pb-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              The collection
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
              {selectedCategory === "All"
                ? "Shop all products"
                : selectedCategory}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5"
              >
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
                  {product.discount && (
                    <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                      {product.discount}% OFF
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`${wishlist.includes(product.id) ? "Remove" : "Add"} ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`}
                    aria-pressed={wishlist.includes(product.id)}
                    className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? "bg-gray-900 text-white"
                        : "bg-white/90 text-gray-700 hover:bg-black hover:text-white"
                    }`}
                  >
                    <Heart
                      size={15}
                      fill={
                        wishlist.includes(product.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>

                <div className="p-4">
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    {product.category}
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    className="block truncate text-sm font-semibold text-gray-900 hover:underline"
                  >
                    {product.name}
                  </Link>
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
                  <Link
                    to={`/products/${product.id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-gray-800"
                  >
                    <ShoppingCart size={15} />
                    Buy Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <Search size={22} className="text-gray-400" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-full bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
