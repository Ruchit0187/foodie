import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[87vh] flex flex-col items-center justify-start pt-20 pb-10 overflow-hidden bg-linear-to-br from-orange-100 via-yellow-50 to-red-100 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4 animate-bounce">🍔 🍕 🍟</div>

        <h1 className="text-7xl font-extrabold text-orange-500">404</h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Recipe Not Found!
        </h2>

        <p className="mt-2 text-gray-600">
          Looks like this page got lost in the kitchen 👨‍🍳 Maybe it was too
          delicious to stay!
        </p>

        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
          >
            🏠 Home
          </Link>

          <Link
            href="/recipes"
            className="px-6 py-3 bg-white text-orange-500 border border-orange-400 rounded-xl shadow-sm hover:bg-orange-50 transition"
          >
            🍽 Browse Recipes
          </Link>
        </div>

        {/* Extra content to allow scroll */}
        <div className="mt-10 text-gray-500 text-sm space-y-2">
          <p>🍜 Try exploring our latest recipes</p>
          <p>🥗 Discover healthy food blogs</p>
          <p>🍰 Find your next favorite dessert</p>
          <p>🍛 Or head back and cook something amazing!</p>
        </div>
      </div>
    </div>
  );
}
