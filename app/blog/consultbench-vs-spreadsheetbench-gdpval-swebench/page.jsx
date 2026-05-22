export const metadata = {
  title: "ConsultBench vs. SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench",
  description:
    "A comparison of ConsultBench with major AI benchmarks including SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench.",
  keywords: [
    "ConsultBench",
    "SpreadsheetBench",
    "GDPval",
    "SWE-bench",
    "Terminal-Bench",
    "AI benchmark comparison"
  ],
  alternates: {
    canonical: "/blog/consultbench-vs-spreadsheetbench-gdpval-swebench"
  },
  openGraph: {
    title: "ConsultBench vs. SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench",
    description:
      "A comparison of ConsultBench with major AI benchmarks including SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench.",
    type: "article",
    publishedTime: "2026-05-22"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ConsultBench vs. SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench",
  datePublished: "2026-05-22",
  dateModified: "2026-05-22",
  author: {
    "@type": "Organization",
    name: "ConsultBench"
  },
  description:
    "A comparison of ConsultBench with major AI benchmarks including SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench."
};

const BASE = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

export default function Article() {
  return (
    <main>
      <header className="siteHeader">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href={`${BASE}/`}>ConsultBench</a>
          <div className="navLinks">
            <a href={`${BASE}/#leaderboard`}>Leaderboard</a>
            <a href={`${BASE}/#tasks`}>Tasks</a>
            <a href={`${BASE}/blog`}>Blog</a>
          </div>
        </nav>
      </header>

      <article className="article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <p className="kicker">Benchmark comparison</p>
        <h1>ConsultBench vs. SpreadsheetBench, GDPval, SWE-bench, and Terminal-Bench</h1>
        <p className="articleDek">
          ConsultBench is not trying to replace existing benchmarks. It is designed to
          occupy a specific gap: cross-file business deliverables where spreadsheets,
          slides, memos, and reviewer judgment all matter.
        </p>
        <p className="postMeta">Published May 22, 2026 · 9 min read</p>

        <h2>The benchmark landscape</h2>
        <p>
          AI benchmarks tend to become influential when they capture a task that people
          recognize as economically meaningful. SWE-bench did this for coding agents by
          using real software issues. SpreadsheetBench does this for spreadsheet work.
          GDPval frames the broader question of whether models can perform economically
          valuable work. Terminal-Bench tests agents operating through terminal workflows.
        </p>

        <h2>What SpreadsheetBench measures</h2>
        <p>
          SpreadsheetBench is the closest neighbor to ConsultBench. It focuses on spreadsheet
          tasks: formulas, data operations, workbook reasoning, and spreadsheet-native
          workflows. That is important because many knowledge workers live in spreadsheets.
        </p>
        <p>
          ConsultBench adds a different layer: the spreadsheet is only one artifact. The
          agent must also update a deck and write a memo, while keeping numbers consistent
          across all three deliverables.
        </p>

        <h2>What GDPval contributes</h2>
        <p>
          GDPval is important because it shifts attention from narrow test questions toward
          work products. It asks whether AI systems can perform tasks connected to real
          occupations. ConsultBench follows that spirit but narrows the domain to analyst
          and consulting workflows that are easier to package, run, and review.
        </p>

        <h2>What SWE-bench and Terminal-Bench teach</h2>
        <p>
          SWE-bench and Terminal-Bench show that benchmark credibility depends on execution
          realism. A good agent benchmark should not only ask for the right answer; it should
          require the system to operate in a realistic environment and produce auditable
          artifacts.
        </p>

        <h2>The ConsultBench gap</h2>
        <p>
          Consulting-style work has a distinctive shape. The answer is often not a single
          number. It is a recommendation backed by analysis, formatted for a client or partner,
          and constrained by business judgment. A model can calculate correctly and still fail
          if the deck is incoherent or the memo ignores the risk that matters.
        </p>
        <p>
          That is the gap ConsultBench targets: multi-file, reviewer-graded, business-facing
          agent work.
        </p>

        <p className="articleCta">
          Review the current task suite in the <a href={`${BASE}/#tasks`}>ConsultBench dataset section</a>.
        </p>
      </article>
    </main>
  );
}
