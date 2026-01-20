function Aboutus() {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-orange-500 to-green-500 text-white text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">About Foodie</h1>
        <p className="text-lg md:text-xl">
          Delivering happiness, one bite at a time
        </p>
      </section>
      <section className="p-5">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Foodie is a modern food delivery platform created for people who
            love delicious food and fast service. We connect you with local
            favorites and top-rated restaurants.
          </p>
          <p className="text-gray-600 mb-6">
            Our mission is simple — make food ordering effortless, enjoyable,
            and reliable. From quick snacks to family meals, Foodie delivers
            happiness to your doorstep.
          </p>
          <div className="flex gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-500">10K+</h3>
              <span className="text-sm text-gray-500">Happy Customers</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-500">500+</h3>
              <span className="text-sm text-gray-500">Restaurants</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-500">30 min</h3>
              <span className="text-sm text-gray-500">Avg Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose Foodie
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
            <p className="text-gray-600">
              We partner with trusted restaurants to ensure quality meals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2"> Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery you can count on.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2"> Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is always our top priority.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;
