import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

function readJson(relativePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function readReferenceRows() {
  try {
    const csv = fs.readFileSync(path.join(ROOT, "examples/runs/reference_leaderboard.csv"), "utf8");
    return parseCsv(csv);
  } catch {
    return [];
  }
}

const plannedModels = [
  ["OpenAI", "GPT-5.5 / frontier agent", "Queued", "0/10", "-", "-", "-"],
  ["Anthropic", "Claude Opus family", "Queued", "0/10", "-", "-", "-"],
  ["Google", "Gemini 3.1 Pro / frontier agent", "Queued", "0/10", "-", "-", "-"],
  ["xAI", "Grok frontier agent", "Candidate", "0/10", "-", "-", "-"],
  ["DeepSeek", "DeepSeek reasoning agent", "Candidate", "0/10", "-", "-", "-"],
];

const benchmarkLandscape = [
  ["GDPval", "Broad occupational work products", "ConsultBench narrows in on consulting-style deliverables."],
  ["SpreadsheetBench", "Spreadsheet operations and reasoning", "ConsultBench adds slides, memos, and cross-file consistency."],
  ["SWE-bench", "Real coding issue resolution", "ConsultBench borrows the idea that tasks should resemble paid work."],
  ["Terminal-Bench", "Agent execution in terminal environments", "ConsultBench similarly emphasizes tool use and reproducibility."],
];

const failureModes = [
  ["Data cleaning", "Keeps duplicate rows, trusts stale exports, or ignores missing fields."],
  ["Analysis", "Uses the wrong range, wrong unit, or unsupported hardcoded number."],
  ["Judgment", "Avoids making a recommendation or ignores the important execution risk."],
  ["Communication", "Creates plausible files that contradict each other."],
];

export default function Home() {
  const manifest = readJson("manifest.json", { task_count: 10, tasks: [] });
  const referenceRows = readReferenceRows();
  const openTasks = manifest.tasks.filter((task) => task.visibility === "public_sample");
  const sealedTasks = manifest.tasks.filter((task) => task.visibility === "private_holdout");

  return (
    <main>
      <header className="siteHeader" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href={`${BASE}/#top`}>ConsultBench</a>
          <div className="navLinks">
            <a href={`${BASE}/#leaderboard`}>Leaderboard</a>
            <a href={`${BASE}/#tasks`}>Tasks</a>
            <a href={`${BASE}/#protocol`}>Protocol</a>
            <a href={`${BASE}/#context`}>Context</a>
            <a href={`${BASE}/blog`}>Blog</a>
          </div>
        </nav>

        <section className="hero">
          <p className="kicker">ConsultBench v0</p>
          <h1>Evaluating AI agents on consulting-style knowledge work.</h1>
          <p className="abstract">
            ConsultBench is a cross-file benchmark for business analyst workflows. Each task
            asks an agent to clean a spreadsheet, interpret client context, update a deck,
            and write a recommendation memo. The benchmark is built to test whether an
            agent can produce work that a human reviewer would trust.
          </p>
          <div className="linkRow" aria-label="Project links">
            <a href={`${BASE}/#leaderboard`}>Leaderboard</a>
            <a href={`${BASE}/#tasks`}>Dataset</a>
            <a href={`${BASE}/#protocol`}>Evaluation protocol</a>
            <a href={`${BASE}/#context`}>Related benchmarks</a>
            <a href={`${BASE}/blog`}>Blog</a>
          </div>
        </section>
      </header>

      <section className="facts" aria-label="Benchmark facts">
        <div>
          <strong>{manifest.task_count}</strong>
          <span>Tasks</span>
        </div>
        <div>
          <strong>{openTasks.length}</strong>
          <span>Open calibration</span>
        </div>
        <div>
          <strong>{sealedTasks.length}</strong>
          <span>Sealed evaluation</span>
        </div>
        <div>
          <strong>0</strong>
          <span>Official model runs</span>
        </div>
      </section>

      <section className="section" id="leaderboard">
        <div className="sectionIntro">
          <p className="kicker">Results</p>
          <h2>Leaderboard pending human-reviewed model runs</h2>
          <p>
            The current 100/100 scores are reference-solution validations only. They prove
            the scorer and file contract work. They are not GPT-5.5 results and should not
            be read as model performance.
          </p>
        </div>

        <div className="notice">
          <strong>No official model scores yet.</strong>
          <span>Next step: run selected agents, score deterministic checks, then send outputs to reviewers.</span>
        </div>

        <div className="tableBlock">
          <div className="tableTitle">
            <h3>Planned evaluation matrix</h3>
            <p>Exact model versions are locked at run time.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Model / agent track</th>
                <th>Status</th>
                <th>Tasks</th>
                <th>Det.</th>
                <th>Rubric</th>
                <th>Overall</th>
              </tr>
            </thead>
            <tbody>
              {plannedModels.map(([provider, model, status, tasks, deterministic, rubric, overall]) => (
                <tr key={`${provider}-${model}`}>
                  <td>{provider}</td>
                  <td>{model}</td>
                  <td><span className="status">{status}</span></td>
                  <td>{tasks}</td>
                  <td>{deterministic}</td>
                  <td>{rubric}</td>
                  <td>{overall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <details className="referenceDetails">
          <summary>Reference solution validation rows</summary>
          <div className="tableBlock compact">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Run type</th>
                  <th>Score</th>
                  <th>Flags</th>
                </tr>
              </thead>
              <tbody>
                {referenceRows.map((row) => (
                  <tr key={row.task_id}>
                    <td>{row.task_id}</td>
                    <td>Reference solution</td>
                    <td>{Number(row.overall_score).toFixed(1)}</td>
                    <td>{row.flags || "none"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>

      <section className="section" id="tasks">
        <div className="sectionIntro">
          <p className="kicker">Dataset</p>
          <h2>Ten analyst-authored task packs</h2>
          <p>
            Every task includes instructions, source workbook, client context document,
            starter deck, hidden checks, rubric, and an expert-style reference solution.
          </p>
        </div>

        <div className="taskColumns">
          <div>
            <h3>Open calibration tasks</h3>
            <table>
              <tbody>
                {openTasks.map((task) => (
                  <tr key={task.task_id}>
                    <td>{task.task_id}</td>
                    <td>{task.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Sealed evaluation set</h3>
            <p>
              Seven private tasks cover sales forecasting, budget variance, vendor consolidation,
              product prioritization, retail performance, segmentation, and board reporting.
            </p>
            <p>
              The sealed set keeps reference solutions and deterministic checks private so
              leaderboard submissions can be audited without overfitting to public examples.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="protocol">
        <div className="sectionIntro">
          <p className="kicker">Evaluation protocol</p>
          <h2>From run artifact to verified score</h2>
        </div>

        <div className="protocolGrid">
          <article>
            <span>01</span>
            <h3>Run</h3>
            <p>Agent receives task files and writes `analysis.xlsx`, `recommendation.pptx`, and `memo.docx`.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Score checks</h3>
            <p>Deterministic checks validate workbook values, file validity, required facts, and cross-file consistency.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Review</h3>
            <p>Human reviewers grade judgment, reasoning, prioritization, communication, and deliverable polish.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Publish</h3>
            <p>Verified runs include model version, date, cost/time metadata, scores, and major failure modes.</p>
          </article>
        </div>
      </section>

      <section className="section" id="context">
        <div className="sectionIntro">
          <p className="kicker">Context</p>
          <h2>Where ConsultBench fits</h2>
        </div>

        <div className="tableBlock">
          <table>
            <thead>
              <tr>
                <th>Benchmark</th>
                <th>What it emphasizes</th>
                <th>ConsultBench relationship</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkLandscape.map(([name, emphasis, relationship]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{emphasis}</td>
                  <td>{relationship}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section finalSection">
        <div className="sectionIntro">
          <p className="kicker">Failure modes</p>
          <h2>What the benchmark is meant to reveal</h2>
        </div>
        <div className="failureList">
          {failureModes.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
