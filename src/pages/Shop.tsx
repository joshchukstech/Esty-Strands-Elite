import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Filter, Image as ImageIcon } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface GalleryImage {
  _id: string;
  imageUrl: string;
  category: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"shop" | "gallery">("shop");

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/gallery").then(res => res.json())
    ])
      .then(([productsData, galleryData]) => {
        setProducts(productsData);
        setGallery(galleryData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);
  const filteredGallery = filter === "all" ? gallery : gallery.filter(g => g.category === filter);

  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-stone-900 mb-4"
            >
              Wig Collection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-stone-600 max-w-2xl"
            >
              Discover our premium selection of luxury wigs, crafted for elegance and durability.
            </motion.p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-stone-200 p-1 rounded-full">
              <button
                onClick={() => setView("shop")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  view === "shop" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Shop Wigs
              </button>
              <button
                onClick={() => setView("gallery")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  view === "gallery" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Gallery
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-stone-400" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white border border-stone-200 text-stone-700 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Categories</option>
                {view === "shop" ? (
                  <>
                    <option value="frontal">Frontal Wigs</option>
                    <option value="closure">Closure Wigs</option>
                    <option value="braided">Braided Wigs</option>
                  </>
                ) : (
                  <>
                    <option value="wig">Wig Work</option>
                    <option value="makeup">Makeup</option>
                    <option value="bridal">Bridal</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        ) : view === "shop" ? (
          filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
              <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-stone-900 mb-2">No products found</h3>
              <p className="text-stone-500">Check back later for new arrivals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-stone-900 mb-2 truncate">{product.title}</h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-medium text-rose-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <a
                        href={`https://wa.me/2348103579468?text=Hello, I am interested in buying the ${product.title} for ₦${product.price}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-stone-900 text-white rounded-full hover:bg-rose-600 transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          filteredGallery.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-stone-100">
              <ImageIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-stone-900 mb-2">No images found</h3>
              <p className="text-stone-500">Check back later for our work gallery.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGallery.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group rounded-2xl overflow-hidden aspect-square bg-stone-100 shadow-sm hover:shadow-md transition-all"
                >
                  {image.imageUrl ? (
                    <img 
                      src={image.imageUrl} 
                      alt="Gallery work" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium uppercase tracking-wider text-sm">
                      {image.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
