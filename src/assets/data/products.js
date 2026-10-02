export const products = [
  {
    id: 1,
    name: "Cordless Power Drill",
    category: "Power Tools",
    price: 2499,
    oldPrice: 3299,
    rating: 4.8,
    reviews: 124,
    discount: 24,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1000&q=85",
    description:
      "A dependable cordless drill for precise everyday repairs and bigger weekend projects. Its balanced grip and versatile performance make it a go-to for both home makers and professionals.",
    features: ["Variable speed control", "Comfort-grip handle", "Includes charger"],
  },
  {
    id: 2,
    name: "Professional Angle Grinder",
    category: "Power Tools",
    price: 3199,
    oldPrice: 4199,
    rating: 4.7,
    reviews: 86,
    discount: 23,
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1000&q=85",
    description:
      "A hardworking angle grinder designed for confident cutting, grinding, and finishing. A sturdy build and easy handling help you stay in control from start to finish.",
    features: ["Powerful motor", "Ergonomic side handle", "Quick-change guard"],
  },
  {
    id: 3,
    name: "Heavy Duty Tool Kit",
    category: "Hand Tools",
    price: 1899,
    oldPrice: 2499,
    rating: 4.9,
    reviews: 152,
    discount: 24,
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1000&q=85",
    description:
      "Keep the essentials close with a thoughtfully assembled tool kit for quick fixes and home improvements. Durable tools and a neatly organized case make every job easier to start.",
    features: ["Essential everyday tools", "Durable carry case", "Easy-to-organize layout"],
  },
  {
    id: 4,
    name: "Circular Saw",
    category: "Power Tools",
    price: 4599,
    oldPrice: 5999,
    rating: 4.8,
    reviews: 73,
    discount: 23,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=85",
    description:
      "Make clean, confident cuts with a circular saw built for reliable workshop performance. Its practical design brings power and precision to your next project.",
    features: ["Precision cutting", "Stable base plate", "Comfortable two-hand grip"],
  },
  {
    id: 5,
    name: "Premium Screwdriver Set",
    category: "Hand Tools",
    price: 899,
    oldPrice: 1299,
    rating: 4.6,
    reviews: 94,
    discount: 31,
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1000&q=85",
    description:
      "A versatile screwdriver set for everyday tightening and repair jobs. The comfortable handles and range of useful tips help you find the right fit quickly.",
    features: ["Multiple precision tips", "Comfortable non-slip handles", "Compact storage stand"],
  },
  {
    id: 6,
    name: "Electric Impact Wrench",
    category: "Power Tools",
    price: 5499,
    oldPrice: 6999,
    rating: 4.9,
    reviews: 61,
    discount: 21,
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1000&q=85",
    description:
      "Take on stubborn fasteners with an impact wrench made for demanding jobs. A balanced body and reliable power help you get more done with less effort.",
    features: ["High-torque performance", "Comfortable grip", "Durable construction"],
  },
  {
    id: 8,
    name: "Safety Work Gloves",
    category: "Safety Equipment",
    price: 499,
    oldPrice: 699,
    rating: 4.5,
    reviews: 87,
    discount: 29,
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=1000&q=85",
    description:
      "A comfortable layer of protection for workshop tasks and home projects. These practical work gloves help you keep a secure grip while getting hands-on.",
    features: ["Flexible everyday protection", "Secure palm grip", "Comfortable fit"],
  },
  {
    id: 9,
    name: "Measuring Tape",
    category: "Accessories",
    price: 299,
    oldPrice: 399,
    rating: 4.6,
    reviews: 145,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=1000&q=85",
    description:
      "Get reliable measurements for everything from quick fixes to detailed builds. This compact tape measure is easy to carry and ready for everyday use.",
    features: ["Clear, easy-to-read markings", "Compact case", "Secure belt clip"],
  },
];

export const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;
