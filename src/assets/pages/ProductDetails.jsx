import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { formatPrice, products } from "../data/products";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f8f7f4] px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Not in our collection
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-900">
          We couldn’t find that product.
        </h1>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>
      </main>
    );
  }

  const placeOrder = (submittedAt) => {
    try {
      const savedOrders = JSON.parse(
        window.localStorage.getItem("nowfixit-orders") || "[]",
      );
      if (!Array.isArray(savedOrders)) {
        throw new Error("Saved order data is not valid.");
      }

      savedOrders.unshift({
        orderId: `NFI-${submittedAt}`,
        productId: product.id,
        quantity,
        createdAt: new Date(submittedAt).toISOString(),
        status: "Order received",
      });
      window.localStorage.setItem("nowfixit-orders", JSON.stringify(savedOrders));
      navigate("/my-orders");
    } catch {
      setError("We couldn’t save your order. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-xs text-gray-500"
        >
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-gray-900">
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="truncate font-medium text-gray-900">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#ecebe5]">
            <div className="absolute left-5 top-5 z-10 rounded-full bg-white/95 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-900">
              {product.discount}% off
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          <section className="flex flex-col py-1 lg:py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-800">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
                <Star size={15} fill="currentColor" className="text-amber-400" />
                {product.rating}
              </span>
              <span className="text-gray-300">·</span>
              <span>{product.reviews} customer reviews</span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3 border-b border-gray-200 pb-6">
              <span className="text-3xl font-bold tracking-tight text-gray-950">
                {formatPrice(product.price)}
              </span>
              <span className="text-base text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
              <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-900">
                Save {formatPrice(product.oldPrice - product.price)}
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 space-y-3">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center justify-between rounded-xl border border-gray-200 bg-white px-3 sm:w-32">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="h-8 w-8 rounded-lg text-lg text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                  className="h-8 w-8 rounded-lg text-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => placeOrder(Date.now())}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-lime-800"
              >
                Place order <ArrowRight size={17} />
              </button>
              <button
                type="button"
                aria-label="Add to wishlist"
                className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-gray-700 transition hover:border-gray-400"
              >
                <Heart size={18} />
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-gray-200 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 text-xs leading-5 text-gray-600">
                <Truck size={18} className="shrink-0 text-gray-900" />
                <span>Free delivery on eligible orders</span>
              </div>
              <div className="flex items-center gap-3 text-xs leading-5 text-gray-600">
                <ShieldCheck size={18} className="shrink-0 text-gray-900" />
                <span>Quality checked before dispatch</span>
              </div>
              <div className="flex items-center gap-3 text-xs leading-5 text-gray-600">
                <PackageCheck size={18} className="shrink-0 text-gray-900" />
                <span>Carefully packed for your project</span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 border-t border-gray-200 pt-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Keep exploring
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                You may also like
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-800 hover:text-lime-800"
            >
              All products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 transition hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-20 w-20 rounded-xl bg-gray-100 object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      {item.category}
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-gray-900">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm text-gray-700">
                      {formatPrice(item.price)}
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
