import ShopItem from "../components/ShopItem";
import { shopItems } from "../data/shopData";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Shop() {
  return (
    <>
      <NavBar />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-forest-green mb-6">
          Fresh Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shopItems.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
