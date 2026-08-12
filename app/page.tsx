"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

export default function Home() {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches: { value: string; index: number; groups: string[] }[] = [];
      if (flags.includes("g")) {
        let m: RegExpExecArray | null;
        const r = new RegExp(pattern, flags);
        while ((m = r.exec(text)) !== null) {
          matches.push({ value: m[0], index: m.index, groups: m.slice(1) });
          if (m[0] === "") r.lastIndex++;
        }
      } else {
        const m = re.exec(text);
        if (m) matches.push({ value: m[0], index: m.index, groups: m.slice(1) });
      }
      return { re, matches, error: "" as string };
    } catch (e) {
      return {
        re: null as RegExp | null,
        matches: [] as { value: string; index: number; groups: string[] }[],
        error: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags, text]);

  useEffect(() => {
    setError(result.error);
  }, [result.error]);

  const highlighted = useMemo(() => {
    if (!result.re || result.matches.length === 0) return text;
    const parts: ReactNode[] = [];
    let cursor = 0;
    result.matches.forEach((m, i) => {
      if (m.index > cursor) parts.push(text.slice(cursor, m.index));
      parts.push(
        <mark key={i} className="rounded bg-amber-200 px-0.5 dark:bg-amber-500/40">
          {m.value || "∅"}
        </mark>
      );
      cursor = m.index + m.value.length;
    });
    if (cursor < text.length) parts.push(text.slice(cursor));
    return parts;
  }, [result, text]);

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  return (
    <Shell title="Regex Tester" subtitle="Experiment with JavaScript regular expressions and see matches instantly.">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Field label="Pattern">
          <input className={inputClass} value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} />
        </Field>
        <Field label="Flags">
          <div className="flex flex-wrap gap-1">
            {["g", "i", "m", "s", "u", "y"].map((f) => (
              <Button key={f} variant={flags.includes(f) ? "primary" : "secondary"} onClick={() => toggleFlag(f)}>
                {f}
              </Button>
            ))}
          </div>
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Test string">
          <textarea className={areaClass} value={text} onChange={(e) => setText(e.target.value)} />
        </Field>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-2 text-sm font-medium">Highlighted</h2>
        <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{highlighted}</p>
      </div>
      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-2 text-sm font-medium">Matches ({result.matches.length})</h2>
        {result.matches.length === 0 ? (
          <p className="text-sm text-zinc-500">No matches</p>
        ) : (
          <ul className="space-y-1 font-mono text-sm">
            {result.matches.map((m, i) => (
              <li key={i}>
                [{m.index}] {JSON.stringify(m.value)}
                {m.groups.length ? ` groups=${JSON.stringify(m.groups)}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}
