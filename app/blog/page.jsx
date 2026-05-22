const posts = [
  {
    href: "/blog/what-is-an-ai-agent-benchmark",
    title: "What Is an AI Agent Benchmark?",
    description:
      "A practical introduction to evals, benchmarks, leaderboards, and why realistic knowledge-work tasks are harder than question answering.",
    date: "May 22, 2026",
    readingTime: "8 min read"
  },
  {
    href: "/blog/consultbench-vs-spreadsheetbench-gdpval-swebench",
    title: "ConsultBench vs. SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench",
    description:
      "Where ConsultBench fits in the benchmark landscape and why cross-file consulting deliverables test a different slice of agent capability.",
    date: "May 22, 2026",
    readingTime: "9 min read"
  }
];

const BASE = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

export const metadata = {
  title: "Blog",
  description:
    "Articles about AI agent benchmarks, LLM evals, knowledge-work evaluation, and the ConsultBench methodology.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "ConsultBench Blog",
    description:
      "Articles about AI agent benchmarks, LLM evals, knowledge-work evaluation, and the ConsultBench methodology.",
    type: "website"
  }
};

export default function BlogIndex() {
  return (
    <main>
      <header className="siteHeader">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href={`${BASE}/`}>ConsultBench</a>
          <div className="navLinks">
            <a href={`${BASE}/#leaderboard`}>Leaderboard</a>
            <a href={`${BASE}/#tasks`}>Tasks</a>
            <a href={`${BASE}/#protocol`}>Protocol</a>
            <a href={`${BASE}/blog`}>Blog</a>
          </div>
        </nav>
      </header>

      <section className="hero blogHero">
        <p className="kicker">ConsultBench Blog</p>
        <h1>Notes on AI agent benchmarks and knowledge-work evals.</h1>
        <p className="abstract">
          Practical writing on how to evaluate AI agents that need to use files, reason
          across artifacts, and produce deliverables a human reviewer can trust.
        </p>
      </section>

      <section className="section blogList">
        {posts.map((post) => (
          <article className="postRow" key={post.href}>
            <div>
              <p className="postMeta">{post.date} · {post.readingTime}</p>
              <h2><a href={`${BASE}${post.href}`}>{post.title}</a></h2>
              <p>{post.description}</p>
            </div>
            <a className="readLink" href={`${BASE}${post.href}`}>Read article</a>
          </article>
        ))}
      </section>
    </main>
  );
}
