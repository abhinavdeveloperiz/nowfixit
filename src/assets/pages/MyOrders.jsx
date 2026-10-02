import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { formatPrice, products } from "../data/products";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    Promise.resolve().then(() => {
      if (!isCurrent) return;
      try {
        const savedOrders = JSON.parse(
          window.localStorage.getItem("nowfixit-orders") || "[]",
        );
        if (!Array.isArray(savedOrders)) {
          throw new Error("Saved order data is not valid.");
        }
        setOrders(savedOrders);
      } catch {
        setLoadError("We couldn’t load your orders. Please refresh and try again.");
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-[2rem] bg-[#171916] px-6 py-8 text-white sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-300">
            Your account
          </p>
          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                My orders
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                A clear view of your recent purchases, all in one place.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-lime-200"
            >
              Shop products <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {loadError ? (
          <p role="alert" className="mt-8 rounded-2xl bg-red-50 p-5 text-sm text-red-800">
            {loadError}
          </p>
        ) : orders.length ? (
          <section className="mt-8 space-y-4" aria-label="Order history">
            {orders.map((order) => {
              const product = products.find((item) => item.id === order.productId);

              return (
                <article
                  key={order.orderId}
                  className="rounded-[1.6rem] border border-gray-200 bg-white p-5 sm:p-7"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                        Order number
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order.orderId}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-50 px-3 py-1.5 text-xs font-semibold text-lime-900">
                        <PackageCheck size={14} /> {order.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {product ? (
                    <div className="flex flex-col gap-5 pt-5 sm:flex-row sm:items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-24 rounded-2xl bg-gray-100 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                          {product.category}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-gray-950">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {order.quantity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <p className="text-lg font-bold text-gray-950">
                          {formatPrice(product.price * order.quantity)}
                        </p>
                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-lime-800"
                        >
                          View item <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p role="alert" className="pt-5 text-sm text-red-700">
                      A product in this order is no longer available.
                    </p>
                  )}
                </article>
              );
            })}
          </section>
        ) : (
          <section className="mt-8 flex flex-col items-center rounded-[1.6rem] border border-gray-200 bg-white px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2f1ec] text-gray-700">
              <ClipboardList size={26} />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-gray-950">
              Your order list is ready when you are
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Once you place an order, its details and status will appear here.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-lime-800"
            >
              <ShoppingBag size={16} /> Explore products
            </Link>
          </section>
        )}

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 text-xs leading-5 text-gray-500">
          <Truck size={18} className="shrink-0 text-gray-700" />
          Your latest order updates will be shown here.
        </div>
      </div>
    </main>
  );
}

export default MyOrders;
