import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend.d";
import { useAllBlogPosts } from "../hooks/useQueries";

const skeletonKeys = ["sk-1", "sk-2", "sk-3", "sk-4"];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const gradients = [
    "from-slate-700 to-slate-900",
    "from-zinc-600 to-zinc-800",
    "from-stone-600 to-stone-900",
    "from-neutral-600 to-neutral-900",
  ];
  return (
    <motion.article
      data-ocid={`blog.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div
        className={`h-52 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}
      >
        <TrendingUp className="w-14 h-14 text-white/25" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-display uppercase tracking-widest">
            {post.date}
          </span>
        </div>
        <h2 className="font-display font-black text-base sm:text-lg uppercase tracking-wide text-foreground mb-3 leading-snug">
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <button
          type="button"
          data-ocid={`blog.read_more.${index + 1}`}
          className="inline-flex items-center gap-1.5 text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline"
        >
          READ MORE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const { data: posts = [], isLoading } = useAllBlogPosts();

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-secondary py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-3">
              KNOWLEDGE CENTER
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              APEX AUTO PARTS BLOG
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-14 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div
              data-ocid="blog.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {skeletonKeys.map((k) => (
                <div
                  key={k}
                  className="bg-white border border-border rounded-sm overflow-hidden animate-pulse"
                >
                  <div className="h-52 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div data-ocid="blog.empty_state" className="text-center py-20">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2">
                NO POSTS YET
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon for automotive tips and guides.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={String(post.id)} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
