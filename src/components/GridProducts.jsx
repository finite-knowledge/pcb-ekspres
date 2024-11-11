import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, Badge } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isOnSale && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
            <Badge className="w-4 h-4 mr-1" />
            Sale!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-current text-red-500" : ""}`}
            />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-2">{product.description}</p>

        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>

        {/* Price */}
        <div className="mb-2">
          {product.isOnSale ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-500">
                ${product.salePrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="text-sm text-gray-600 mb-2">
          {product.stock > 0 ? (
            <span>{product.stock} in stock</span>
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 cursor-pointer ${
                  star <= product.rating
                    ? "fill-current text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.ratingCount} reviews)
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)} // Call addToCart when clicked
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const GridProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "http://localhost:3001/api/products";
        if (selectedCategory !== "All") {
          url = `http://localhost:3001/api/products/category/${encodeURIComponent(selectedCategory)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);

        // Only update categories when fetching all products
        if (selectedCategory === "All") {
          const uniqueCategories = [
            "All",
            ...new Set(data.map((p) => p.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Electronic Components & Tools
      </h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default GridProducts;
// import React, { useState } from "react";
// import { Star, ShoppingCart, Heart, Badge } from "lucide-react";

// // Mock products data with categories
// const products = [
//   {
//     id: 1,
//     name: "2-Layer PCB Prototype",
//     price: 29.99,
//     rating: 4.5,
//     ratingCount: 128,
//     stock: 500,
//     category: "PCB Prototypes",
//     isOnSale: true,
//     salePrice: 24.99,
//     description:
//       "High-quality 2-layer PCB prototype with quick turnaround. FR4 material, green solder mask.",
//     image: "https://swimbi.com/wp-content/uploads/2020/06/2-layer-PCB.png",
//   },
//   {
//     id: 2,
//     name: "4-Layer PCB Prototype",
//     price: 49.99,
//     rating: 4.7,
//     ratingCount: 89,
//     stock: 1000,
//     category: "PCB Prototypes",
//     isOnSale: false,
//     description:
//       "Professional 4-layer PCB prototype with advanced capabilities. Suitable for complex designs.",
//     image:
//       "https://www.eetasia.com/wp-content/uploads/sites/2/2022/03/multilayer-pcbs.jpg?w=424&h=283&crop=1",
//   },
//   {
//     id: 3,
//     name: "Arduino Uno R3",
//     price: 24.99,
//     rating: 4.8,
//     ratingCount: 256,
//     stock: 750,
//     category: "Development Boards",
//     isOnSale: true,
//     salePrice: 19.99,
//     description:
//       "Original Arduino Uno R3 development board with ATmega328P microcontroller.",
//     image:
//       "https://store.arduino.cc/cdn/shop/files/A000066_03.front_619x465.jpg?v=1727098250",
//   },
//   {
//     id: 4,
//     name: "Raspberry Pi 4 Model B",
//     price: 45.99,
//     rating: 4.9,
//     ratingCount: 312,
//     stock: 200,
//     category: "Development Boards",
//     isOnSale: false,
//     description:
//       "Latest Raspberry Pi 4 with 4GB RAM, perfect for IoT projects.",
//     image:
//       "https://assets.raspberrypi.com/static/a6331df010eb56a7fafb04466af3f1aa/9ff6b/3a15d4da-46e3-4940-8be6-9fc7d201affe_RPi_4B_FEATURED.webp",
//   },
//   {
//     id: 5,
//     name: "Soldering Iron Kit",
//     price: 39.99,
//     rating: 4.6,
//     ratingCount: 178,
//     stock: 300,
//     category: "Tools",
//     isOnSale: true,
//     salePrice: 29.99,
//     description:
//       "Professional soldering iron kit with adjustable temperature and various tips.",
//     image: "https://pine64.com/wp-content/uploads/2020/11/Pinecilv2-1.jpg",
//   },
//   {
//     id: 6,
//     name: "Digital Multimeter",
//     price: 34.99,
//     rating: 4.7,
//     ratingCount: 145,
//     stock: 400,
//     category: "Tools",
//     isOnSale: false,
//     description:
//       "Precision digital multimeter for voltage, current, and resistance measurements.",
//     image: "https://www.esitest.com/Content/files/480Arednew.jpg",
//   },
//   {
//     id: 7,
//     name: "LED Strip Kit",
//     price: 19.99,
//     rating: 4.5,
//     ratingCount: 89,
//     stock: 600,
//     category: "Components",
//     isOnSale: true,
//     salePrice: 14.99,
//     description: "5m RGB LED strip with controller and power supply.",
//     image:
//       "https://leddirect.co.uk/cdn/shop/products/integral-led-default-title-integral-led-rgb-plug-play-colour-changing-led-strip-kit-5m-rgb-strip-30leds-m-ir-controller-uk-wall-mounted-driver-17286660128919_600x600_crop_center.jpg?v=1648321418",
//   },
//   {
//     id: 8,
//     name: "Resistor Kit",
//     price: 15.99,
//     rating: 4.4,
//     ratingCount: 67,
//     stock: 1000,
//     category: "Components",
//     isOnSale: false,
//     description: "Complete resistor kit with various values and power ratings.",
//     image:
//       "https://static.cytron.io/image/catalog/products/KIT-025W-RS-600/KIT-025W-RS-600-a.jpg",
//   },
//   {
//     id: 9,
//     name: "ESP32 Development Board",
//     price: 12.99,
//     rating: 4.6,
//     ratingCount: 234,
//     stock: 800,
//     category: "Development Boards",
//     isOnSale: true,
//     salePrice: 9.99,
//     description: "WiFi & Bluetooth enabled ESP32 development board.",
//     image:
//       "https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/425/MFG_ESP32-DEVKITC-VIE.jpg",
//   },
//   {
//     id: 10,
//     name: "8-Layer PCB Prototype",
//     price: 89.99,
//     rating: 4.9,
//     ratingCount: 45,
//     stock: 100,
//     category: "PCB Prototypes",
//     isOnSale: false,
//     description: "Advanced 8-layer PCB prototype for high-complexity designs.",
//     image:
//       "https://www.eetasia.com/wp-content/uploads/sites/2/2022/03/multilayer-pcbs.jpg?w=424&h=283&crop=1",
//   },
//   {
//     id: 11,
//     name: "Logic Analyzer",
//     price: 49.99,
//     rating: 4.5,
//     ratingCount: 112,
//     stock: 250,
//     category: "Tools",
//     isOnSale: true,
//     salePrice: 39.99,
//     description: "USB Logic Analyzer with 8 channels and software included.",
//     image: "https://cdn.sparkfun.com/assets/parts/2/2/2/9/08938-02.jpg",
//   },
//   {
//     id: 12,
//     name: "Capacitor Kit",
//     price: 16.99,
//     rating: 4.3,
//     ratingCount: 78,
//     stock: 900,
//     category: "Components",
//     isOnSale: false,
//     description: "Comprehensive capacitor kit with various values and types.",
//     image:
//       "https://www.voltaat.com/cdn/shop/products/voltaat-voltaat-capacitor-kit-12-values-120-pack-15535211020390.jpg?v=1628440386",
//   },
//   {
//     id: 13,
//     name: "STM32 Discovery Kit",
//     price: 29.99,
//     rating: 4.7,
//     ratingCount: 167,
//     stock: 300,
//     category: "Development Boards",
//     isOnSale: true,
//     salePrice: 24.99,
//     description: "STM32 Discovery board for ARM Cortex-M4 development.",
//     image:
//       "https://cdn11.bigcommerce.com/s-3fd3md1ghs/images/stencil/1280x1280/products/26563/16825/STM32F407G-DISC1__15714.1682751990.jpg?c=2",
//   },
//   {
//     id: 14,
//     name: "Flexible PCB Prototype",
//     price: 39.99,
//     rating: 4.6,
//     ratingCount: 56,
//     stock: 150,
//     category: "PCB Prototypes",
//     isOnSale: false,
//     description: "Flexible PCB prototype service with polyimide material.",
//     image:
//       "https://image.made-in-china.com/2f0j00PGeYVHBFHIoL/Multi-Layer-Rigid-Flex-PCB-Fr4-Polyimide-Material-Sample-Making.webp",
//   },
//   {
//     id: 15,
//     name: "Oscilloscope",
//     price: 299.99,
//     rating: 4.8,
//     ratingCount: 89,
//     stock: 50,
//     category: "Tools",
//     isOnSale: true,
//     salePrice: 249.99,
//     description:
//       "Digital oscilloscope with 100MHz bandwidth and USB interface.",
//     image:
//       "https://siglentna.com/wp-content/uploads/2019/06/SDS1204XE4-600x600.jpg",
//   },
//   {
//     id: 16,
//     name: "IC Kit",
//     price: 45.99,
//     rating: 4.4,
//     ratingCount: 91,
//     stock: 400,
//     category: "Components",
//     isOnSale: false,
//     description:
//       "Collection of common integrated circuits for electronics projects.",
//     image: "https://m.media-amazon.com/images/I/51YKbGc7DoS._AC_.jpg",
//   },
//   {
//     id: 17,
//     name: "NodeMCU ESP8266",
//     price: 8.99,
//     rating: 4.5,
//     ratingCount: 289,
//     stock: 1000,
//     category: "Development Boards",
//     isOnSale: true,
//     salePrice: 6.99,
//     description: "WiFi-enabled ESP8266 development board with USB interface.",
//     image:
//       "https://www.makerstore.com.au/wp-content/uploads/2024/02/ELEC-NODEMCU-ESP8266BB-45-Down.webp",
//   },
//   {
//     id: 18,
//     name: "PCB Starter Kit",
//     price: 59.99,
//     rating: 4.7,
//     ratingCount: 134,
//     stock: 200,
//     category: "PCB Prototypes",
//     isOnSale: false,
//     description: "Complete PCB prototyping kit with various board sizes.",
//     image:
//       "https://hobbycomponents.com/2730-large_default/pcb-project-prototyping-kit.jpg",
//   },
//   {
//     id: 19,
//     name: "Breadboard Kit",
//     price: 19.99,
//     rating: 4.6,
//     ratingCount: 178,
//     stock: 600,
//     category: "Tools",
//     isOnSale: true,
//     salePrice: 15.99,
//     description: "Breadboard kit with power supply and jumper wires.",
//     image:
//       "https://www.pi-shop.ch/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1_87a0a610-d93d-45b0-a882-51089b2508f8_800x.png",
//   },
//   {
//     id: 20,
//     name: "Transistor Kit",
//     price: 14.99,
//     rating: 4.5,
//     ratingCount: 145,
//     stock: 800,
//     category: "Components",
//     isOnSale: false,
//     description: "Comprehensive transistor kit with various types and ratings.",
//     image:
//       "https://quartzcomponents.com/cdn/shop/products/transistor-kit_2_1024x1024.jpg?v=1652079898",
//   },
// ];

// const ProductCard = ({ product }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [userRating, setUserRating] = useState(0);

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover"
//         />
//         {product.isOnSale && (
//           <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
//             <Badge className="w-4 h-4 mr-1" />
//             Sale!
//           </div>
//         )}
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {product.name}
//           </h3>
//           <button
//             onClick={() => setIsLiked(!isLiked)}
//             className="text-gray-400 hover:text-red-500 transition-colors"
//           >
//             <Heart
//               className={`w-5 h-5 ${isLiked ? "fill-current text-red-500" : ""}`}
//             />
//           </button>
//         </div>

//         <p className="text-sm text-gray-600 mb-2">{product.description}</p>

//         {/* Category Badge */}
//         <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
//           {product.category}
//         </span>

//         {/* Price */}
//         <div className="mb-2">
//           {product.isOnSale ? (
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-red-500">
//                 ${product.salePrice}
//               </span>
//               <span className="text-sm text-gray-500 line-through">
//                 ${product.price}
//               </span>
//             </div>
//           ) : (
//             <span className="text-lg font-bold text-gray-800">
//               ${product.price}
//             </span>
//           )}
//         </div>

//         {/* Stock Status */}
//         <div className="text-sm text-gray-600 mb-2">
//           {product.stock > 0 ? (
//             <span>{product.stock} in stock</span>
//           ) : (
//             <span className="text-red-500">Out of stock</span>
//           )}
//         </div>

//         {/* Rating */}
//         <div className="flex items-center mb-3">
//           <div className="flex">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 className={`w-4 h-4 cursor-pointer ${
//                   star <= product.rating
//                     ? "fill-current text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//                 onClick={() => setUserRating(star)}
//               />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600 ml-2">
//             ({product.ratingCount} reviews)
//           </span>
//         </div>

//         {/* Add to Cart Button */}
//         <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
//           <ShoppingCart className="w-4 h-4" />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// const GridProducts = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         Electronic Components & Tools
//       </h2>

//       {/* Category Filter */}
//       <div className="flex flex-wrap gap-2 justify-center mb-8">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={`px-4 py-2 rounded-full ${
//               selectedCategory === category
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GridProducts;
