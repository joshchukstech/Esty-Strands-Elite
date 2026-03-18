import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trash2, Plus, LogOut, Image as ImageIcon } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(false);

  // Data states
  const [products, setProducts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Form states
  const [productForm, setProductForm] = useState({ title: "", description: "", price: "", category: "frontal", file: null as File | null });
  const [postForm, setPostForm] = useState({ title: "", content: "", file: null as File | null });
  const [galleryForm, setGalleryForm] = useState({ category: "wig", file: null as File | null });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, postRes, galRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/posts"),
        fetch("/api/gallery")
      ]);
      setProducts(await prodRes.json());
      setPosts(await postRes.json());
      setGallery(await galRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert("Invalid password");
      }
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", productForm.title);
    formData.append("description", productForm.description);
    formData.append("price", productForm.price);
    formData.append("category", productForm.category);
    if (productForm.file) formData.append("image", productForm.file);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setProductForm({ title: "", description: "", price: "", category: "frontal", file: null });
        fetchData();
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", postForm.title);
    formData.append("content", postForm.content);
    if (postForm.file) formData.append("image", postForm.file);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setPostForm({ title: "", content: "", file: null });
        fetchData();
      } else {
        alert("Failed to add post");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.file) return alert("Please select an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("category", galleryForm.category);
    formData.append("image", galleryForm.file);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setGalleryForm({ category: "wig", file: null });
        fetchData();
      } else {
        alert("Failed to add image");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-serif text-stone-900">Admin Login</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-serif">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-stone-300 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "products" ? "bg-rose-500 text-white" : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            Manage Wigs
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "posts" ? "bg-rose-500 text-white" : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            Manage Blog
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "gallery" ? "bg-rose-500 text-white" : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            Manage Gallery
          </button>
        </div>

        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
              <h2 className="text-xl font-serif text-stone-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-rose-500" /> Add New Wig
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input
                  type="text"
                  placeholder="Wig Title"
                  required
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  required
                  rows={3}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price (₦)"
                  required
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />
                <select
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                >
                  <option value="frontal">Frontal</option>
                  <option value="closure">Closure</option>
                  <option value="braided">Braided</option>
                </select>
                <div className="border-2 border-dashed border-stone-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductForm({ ...productForm, file: e.target.files?.[0] || null })}
                    className="hidden"
                    id="product-image"
                  />
                  <label htmlFor="product-image" className="cursor-pointer flex flex-col items-center text-stone-500 hover:text-rose-500 transition-colors">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm">{productForm.file ? productForm.file.name : "Upload Image"}</span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 transition-colors"
                >
                  {loading ? "Adding..." : "Add Wig"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h2 className="text-xl font-serif text-stone-900 mb-6">Current Inventory</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p._id} className="flex gap-4 border border-stone-100 rounded-xl p-4 items-center">
                    <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-stone-900 truncate">{p.title}</h4>
                      <p className="text-sm text-stone-500">₦{p.price}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {products.length === 0 && <p className="text-stone-500 col-span-2 text-center py-8">No products found.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
              <h2 className="text-xl font-serif text-stone-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-rose-500" /> New Story
              </h2>
              <form onSubmit={handleAddPost} className="space-y-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  required
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                />
                <textarea
                  placeholder="Content"
                  required
                  rows={6}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                />
                <div className="border-2 border-dashed border-stone-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPostForm({ ...postForm, file: e.target.files?.[0] || null })}
                    className="hidden"
                    id="post-image"
                  />
                  <label htmlFor="post-image" className="cursor-pointer flex flex-col items-center text-stone-500 hover:text-rose-500 transition-colors">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm">{postForm.file ? postForm.file.name : "Upload Image"}</span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 transition-colors"
                >
                  {loading ? "Publishing..." : "Publish Story"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h2 className="text-xl font-serif text-stone-900 mb-6">Published Stories</h2>
              <div className="space-y-4">
                {posts.map((p) => (
                  <div key={p._id} className="flex gap-4 border border-stone-100 rounded-xl p-4 items-center">
                    <div className="w-24 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium text-stone-900 truncate">{p.title}</h4>
                      <p className="text-sm text-stone-500 truncate">{p.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePost(p._id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {posts.length === 0 && <p className="text-stone-500 text-center py-8">No stories found.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit">
              <h2 className="text-xl font-serif text-stone-900 mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-rose-500" /> Add to Gallery
              </h2>
              <form onSubmit={handleAddGallery} className="space-y-4">
                <select
                  className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                >
                  <option value="wig">Wig Work</option>
                  <option value="makeup">Makeup</option>
                  <option value="bridal">Bridal</option>
                </select>
                <div className="border-2 border-dashed border-stone-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setGalleryForm({ ...galleryForm, file: e.target.files?.[0] || null })}
                    className="hidden"
                    id="gallery-image"
                  />
                  <label htmlFor="gallery-image" className="cursor-pointer flex flex-col items-center text-stone-500 hover:text-rose-500 transition-colors">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-sm">{galleryForm.file ? galleryForm.file.name : "Upload Image"}</span>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 transition-colors"
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h2 className="text-xl font-serif text-stone-900 mb-6">Gallery Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g._id} className="relative group rounded-xl overflow-hidden aspect-square bg-stone-100">
                    {g.imageUrl && <img src={g.imageUrl} alt="Gallery" className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteGallery(g._id)}
                        className="p-2 bg-white text-rose-500 rounded-full hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium uppercase text-stone-600">
                      {g.category}
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && <p className="text-stone-500 col-span-3 text-center py-8">No images found.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
