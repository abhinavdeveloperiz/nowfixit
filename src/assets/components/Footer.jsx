import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Sparkles,
  Home,
  ShoppingBag,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

function Footer() {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = footerRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Products',
      path: '/products',
      icon: ShoppingBag,
    },
    {
      name: 'My Orders',
      path: '/my-orders',
      icon: Package,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-black text-white"
    >

      {/* Animated Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className={`absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl transition-all duration-[2000ms] ease-out ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-50 opacity-0'
          }`}
        />

        <div
          className={`absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl transition-all delay-300 duration-[2000ms] ease-out ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-50 opacity-0'
          }`}
        />

      </div>

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div
            className={`lg:col-span-2 transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >

            <NavLink
              to="/"
              className="group mb-5 inline-flex items-center gap-2"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:rounded-2xl">
                <Sparkles
                  size={20}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                NowFix<span className="text-gray-500">It</span>
              </span>

            </NavLink>

            <p className="max-w-md text-sm leading-6 text-gray-400">
              Simple, reliable and convenient solutions designed to make
              your everyday needs easier. Discover products and manage
              everything from one place.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">

              <div className="flex w-fit items-center gap-3 text-sm text-gray-400">
                <Mail
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>hello@nowfixit.com</span>
              </div>

              <div className="flex w-fit items-center gap-3 text-sm text-gray-400">
                <Phone
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>+91 9207 7738 47</span>
              </div>

              <div className="group flex w-fit items-center gap-3 text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-white">
                <MapPin
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Kerala, India</span>
              </div>

            </div>

          </div>

          {/* Navigation */}
          <div
            className={`transform transition-all delay-150 duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <ul className="space-y-3">

              {navLinks.map((link) => {
                const Icon = link.icon

                return (
                  <li key={link.path}>

                    <NavLink
                      to={link.path}
                      className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
                    >

                      <Icon
                        size={15}
                        className="transition-all duration-300 group-hover:scale-110"
                      />

                      {link.name}

                    </NavLink>

                  </li>
                )
              })}

            </ul>

          </div>

          {/* Helpful note */}
          <div
            className={`transform transition-all delay-300 duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Made for your next project
            </h3>
            <p className="max-w-xs text-sm leading-6 text-gray-400">
              Find dependable tools, keep track of your orders, and manage your
              account in one simple place.
            </p>

          </div>

        </div>

        {/* Bottom */}
        <div
          className={`mt-12 border-t border-white/10 pt-6 transform transition-all delay-500 duration-700 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          }`}
        >

          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} NowFixIt. All rights reserved.
            </p>

            <p className="text-xs text-gray-500 transition-colors duration-300 hover:text-gray-300">
              Built with care in Kerala, India.
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer