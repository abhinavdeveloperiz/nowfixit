import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { formatPrice, products } from "../data/products";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === Number(productId));
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
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

  const galleryImages = [
    ...new Set([
      product.image,
      ...products
        .filter(
          (item) =>
            item.category === product.category && item.id !== product.id,
        )
        .map((item) => item.image),
      ...products
        .filter((item) => item.id !== product.id)
        .map((item) => item.image),
    ]),
  ].slice(0, 4);

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
      window.localStorage.setItem(
        "nowfixit-orders",
        JSON.stringify(savedOrders),
      );
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
          <span className="truncate font-medium text-gray-900">
            {product.name}
          </span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-sm">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-white/95 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                {product.discount}% off
              </div>
              <img
                key={galleryImages[activeImageIndex]}
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} image ${activeImageIndex + 1}`}
                className="aspect-square h-full w-full object-cover transition-opacity duration-300"
              />
            </div>
            <div
              className="mt-4 grid grid-cols-4 gap-3"
              aria-label="Product images"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                  className={`overflow-hidden rounded-xl border-2 bg-white transition ${
                    activeImageIndex === index
                      ? "border-gray-900 ring-2 ring-gray-900/10"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <section className="flex flex-col py-1 lg:py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-800">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-gray-950">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-900">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 border-t border-gray-200 pt-5 text-sm leading-7 text-gray-600 text-justify">
              {product.description}
            </p>

            <div className="mt-6 space-y-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-800">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gray-900 bg-white shadow-lg p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Quantity
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Choose how many you need
                  </p>
                </div>
                <div className="flex h-11 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-2">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    <Minus size={15} />
                  </button>
                  <span
                    aria-live="polite"
                    className="min-w-5 text-center text-sm font-semibold text-gray-900"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => placeOrder(Date.now())}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-lime-800"
              >
                Place order <ArrowRight size={17} />
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-gray-200 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 text-xs leading-5 bg-green-600 text-gray-100 px-6 py-2">
                <Truck size={18} className="shrink-0 text-gray-100" />
                <span>Free delivery on eligible orders</span>
              </div>
              <div className="flex items-center gap-3 text-xs leading-5 bg-blue-600 text-gray-100 px-6 py-2">
                <ShieldCheck size={18} className="shrink-0 text-gray-100" />
                <span>Quality checked before dispatch</span>
              </div>
              <div className="flex items-center gap-3 text-xs leading-5 bg-purple-600 text-gray-100 px-6 py-2">
                <PackageCheck size={18} className="shrink-0 text-gray-100" />
                <span>Carefully packed for your project</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
