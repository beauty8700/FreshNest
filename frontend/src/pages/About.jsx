const About = () => {
  return (
    <div className="max-w-4xl mx-auto pt-20">
      <h2 className="text-3xl font-bold text-green-800 mb-6">About FreshNest 🌱</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <section>
          <h3 className="text-xl font-bold text-green-800 mb-3">Our Mission</h3>
          <p className="text-gray-700">
            FreshNest is dedicated to bringing you the freshest, organic produce directly from local farmers.
            We believe in supporting sustainable agriculture and providing our customers with healthy,
            high-quality products.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-green-800 mb-3">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>100% Organic and Fresh Products</li>
            <li>Direct from Local Farmers</li>
            <li>Fair Trade Practices</li>
            <li>Eco-Friendly Packaging</li>
            <li>Fast and Reliable Delivery</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-green-800 mb-3">Our Story</h3>
          <p className="text-gray-700">
            Founded with a passion for healthy living and supporting local communities, FreshNest
            connects farmers directly with consumers. We eliminate middlemen to ensure fair prices
            for both farmers and customers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;

