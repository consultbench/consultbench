import "./globals.css";

export const metadata = {
  title: {
    default: "ConsultBench",
    template: "%s | ConsultBench"
  },
  description: "ConsultBench is a benchmark for AI agents performing consulting-style knowledge work across spreadsheets, slides, and memos.",
  keywords: [
    "AI agent benchmark",
    "LLM evals",
    "consulting benchmark",
    "knowledge work benchmark",
    "spreadsheet benchmark",
    "AI evaluation"
  ],
  openGraph: {
    title: "ConsultBench",
    description: "A benchmark for AI agents performing consulting-style knowledge work across spreadsheets, slides, and memos.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
