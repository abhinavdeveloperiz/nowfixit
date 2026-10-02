import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  LogOut,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
};

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isCurrent = true;

    Promise.resolve().then(() => {
      if (!isCurrent) return;
      try {
        const savedProfile = window.localStorage.getItem("nowfixit-profile");
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile({
            name: parsedProfile.name || "",
            email: parsedProfile.email || "",
            phone: parsedProfile.phone || "",
          });
        }
      } catch {
        setError("We couldn’t load your profile details.");
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const initials =
    profile.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "NF";

  const logOut = () => {
    try {
      window.localStorage.removeItem("nowfixit-profile");
      setProfile(emptyProfile);
      setError("");
      navigate("/");
    } catch {
      setError("We couldn’t log you out. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="rounded-[2rem] bg-[#171916] px-6 py-8 text-white sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-300">
            Your account
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lime-200 text-xl font-semibold text-gray-950">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                {profile.name || "Welcome to NowFixIt"}
              </h1>
              <p className="mt-1 truncate text-sm text-white/60">
                {profile.email || "Your account, all in one place"}
              </p>
            </div>
            <button
              type="button"
              onClick={logOut}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-medium text-white/85 transition hover:border-red-300/40 hover:bg-red-400/10 hover:text-red-100"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </section>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        )}

        <section className="mt-9">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Quick links
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-950">
              Where would you like to go?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/my-orders"
              className="group relative flex min-h-52 flex-col justify-between overflow-hidden rounded-[1.6rem] bg-lime-200 p-6 text-gray-950 transition hover:-translate-y-1 hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-900/10 sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute -right-7 -top-8 h-36 w-36 rounded-full bg-white/35 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/70">
                <Package size={21} />
              </span>
              <span className="relative mt-8 flex items-end justify-between gap-3">
                <span>
                  <span className="block text-lg font-semibold">
                    Track your orders
                  </span>
                  <span className="mt-1 block text-sm text-gray-700">
                    Check your purchases and order status
                  </span>
                </span>
                <ArrowRight
                  size={19}
                  className="mb-1 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              to="/"
              className="group flex min-h-52 flex-col justify-between rounded-[1.6rem] border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f1ec] text-gray-800">
                <Home size={20} />
              </span>
              <span className="mt-8 flex items-end justify-between gap-3">
                <span>
                  <span className="block text-lg font-semibold text-gray-950">
                    Home
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Back to the NowFixIt homepage
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="mb-1 shrink-0 text-gray-500 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              to="/products"
              className="group flex min-h-52 flex-col justify-between rounded-[1.6rem] border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f1ec] text-gray-800">
                <ShoppingBag size={20} />
              </span>
              <span className="mt-8 flex items-end justify-between gap-3">
                <span>
                  <span className="block text-lg font-semibold text-gray-950">
                    Browse products
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Find the right tools for your next project
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="mb-1 shrink-0 text-gray-500 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
        </section>

        {(profile.phone || profile.email) && (
          <section className="mt-8 rounded-[1.6rem] border border-gray-200 bg-white p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2f1ec] text-gray-700">
                <UserRound size={18} />
              </span>
              <div>
                <h2 className="font-semibold text-gray-950">Account details</h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Details saved in this browser
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
              {profile.email && (
                <div>
                  <p className="text-xs font-medium text-gray-400">Email</p>
                  <p className="mt-1 break-all text-sm text-gray-800">
                    {profile.email}
                  </p>
                </div>
              )}
              {profile.phone && (
                <div>
                  <p className="text-xs font-medium text-gray-400">Phone</p>
                  <p className="mt-1 text-sm text-gray-800">{profile.phone}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Profile;
