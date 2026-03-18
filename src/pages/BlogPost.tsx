import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, User, ArrowLeft } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen py-24">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-stone-50 min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-serif text-stone-900 mb-4">Post not found</h1>
          <Link to="/blog" className="text-rose-600 hover:text-rose-700">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-stone-600 hover:text-rose-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {post.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-2xl mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Esty
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">
            {post.title}
          </h1>

          <div className="prose prose-stone prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-stone-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
