"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Operator approval screen.
 *
 * The password is held in this tab only and sent per request — it is never
 * written to storage, so a phone left on a table does not stay logged in. The
 * real check happens server-side against BOOTH_KEY; this component just
 * carries the key and refuses to render the queue without it.
 */

interface Job {
  id: string;
  createdAt: string;
  name: string;
  world: string;
  power: string;
  variant: "epic" | "kawaii";
  format: "photo" | "video";
  photoCode: string | null;
  prompt: string;
  status: string;
  stillUrl?: string | null;
  videoUrl?: string | null;
  note?: string | null;
}

interface Queue {
  generationReady: boolean;
  pending: Job[];
  approved: Job[];
  working: Job[];
  done: Job[];
}

export default function BoothControl() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [queue, setQueue] = useState<Queue | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const keyRef = useRef("");

  const load = useCallback(async () => {
    if (!keyRef.current) return;
    try {
      const res = await fetch("/api/booth/admin", {
        headers: { "x-booth-key": keyRef.current },
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthed(false);
        setErr("Wrong password.");
        return;
      }
      const j = await res.json();
      if (j.error) {
        setErr(j.error === "store-not-configured" ? "Blob store not set up in Vercel yet." : j.error);
        return;
      }
      setErr(null);
      setAuthed(true);
      setQueue(j);
    } catch {
      setErr("Network error.");
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [authed, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    keyRef.current = key;
    await load();
  };

  const act = async (id: string, action: "approve" | "reject") => {
    setBusy(id);
    try {
      await fetch("/api/booth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-booth-key": keyRef.current },
        body: JSON.stringify({ id, action }),
      });
      await load();
    } finally {
      setBusy(null);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={signIn} className="w-full max-w-sm">
          <p className="font-sans text-white/45 text-[10px] tracking-widest2 uppercase mb-3">
            Nataka · Internal
          </p>
          <h1 className="font-geist font-black text-3xl text-white uppercase mb-6">
            Booth Control
          </h1>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-transparent border-b-2 border-white/20 focus:border-otaku outline-none font-geist text-xl text-white placeholder:text-white/25 py-3 transition-colors"
          />
          <button
            type="submit"
            className="w-full mt-6 font-geist font-black text-xs text-ink bg-otaku px-6 py-4 uppercase tracking-widest"
          >
            Unlock
          </button>
          {err && <p className="font-sans text-otaku-light text-xs mt-4">{err}</p>}
        </form>
      </div>
    );
  }

  const Card = ({ job, children }: { job: Job; children?: React.ReactNode }) => (
    <div className="border border-white/12 p-4 mb-2.5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="font-geist font-black text-lg text-white uppercase leading-none">
            {job.name}
          </p>
          <p className="font-sans text-white/50 text-xs mt-1.5">
            {job.world} · {job.power}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-otaku text-sm">{job.id}</p>
          <p className="font-sans text-white/40 text-[10px] uppercase tracking-widest mt-1">
            {job.variant} · {job.format === "photo" ? "photo" : "photo+video"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span
          className="font-sans text-[10px] tracking-widest uppercase px-2 py-1"
          style={{
            background: job.photoCode ? "#1d3f26" : "#3a2a10",
            color: job.photoCode ? "#9be3ae" : "#f0c98a",
          }}
        >
          {job.photoCode ? `photo ${job.photoCode}` : "no photo — shoot at booth"}
        </span>
        <button
          type="button"
          onClick={() => setOpen(open === job.id ? null : job.id)}
          className="font-sans text-[10px] tracking-widest uppercase text-white/50 underline"
        >
          {open === job.id ? "hide prompt" : "see prompt"}
        </button>
      </div>

      {open === job.id && (
        <p className="font-mono text-[11px] text-white/55 leading-relaxed mt-3 max-h-40 overflow-y-auto border-l-2 border-white/15 pl-3">
          {job.prompt}
        </p>
      )}

      {job.note && <p className="font-sans text-otaku-light text-xs mt-2">{job.note}</p>}
      {children}
    </div>
  );

  const count = queue?.pending.length ?? 0;

  return (
    <div className="px-5 md:px-10 py-6 max-w-3xl mx-auto">
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="font-geist font-black text-xl text-white uppercase tracking-wide">
          Booth <span className="text-otaku">Control</span>
        </h1>
        <p className="font-sans text-white/40 text-[10px] uppercase tracking-widest">
          live · refreshes every 3s
        </p>
      </div>
      <p className="font-sans text-white/45 text-xs mb-6">
        Take the money, then approve. Nothing generates until you do.
      </p>

      {err && <p className="font-sans text-otaku-light text-xs mb-4">{err}</p>}

      {queue && !queue.generationReady && (
        <div className="border border-otaku/50 bg-otaku/10 p-3 mb-5">
          <p className="font-sans text-otaku-light text-xs leading-relaxed">
            <strong>GOOGLE_API_KEY is not set in Vercel.</strong> Approving will queue a job but
            nothing will generate until it is added.
          </p>
        </div>
      )}

      <h2 className="font-sans text-[10px] tracking-widest2 uppercase text-otaku mb-3">
        Waiting for approval {count > 0 && `· ${count}`}
      </h2>
      {count === 0 ? (
        <p className="font-sans text-white/35 text-xs mb-8">Nothing waiting.</p>
      ) : (
        <div className="mb-8">
          {queue!.pending.map((job) => (
            <Card key={job.id} job={job}>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  disabled={busy === job.id}
                  onClick={() => act(job.id, "approve")}
                  className="font-geist font-black text-xs text-ink bg-otaku px-4 py-3.5 uppercase tracking-widest disabled:opacity-50"
                >
                  ✓ Paid — approve
                </button>
                <button
                  type="button"
                  disabled={busy === job.id}
                  onClick={() => act(job.id, "reject")}
                  className="font-geist font-black text-xs text-white/70 border border-white/20 px-4 py-3.5 uppercase tracking-widest disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {(queue!.approved.length > 0 || queue!.working.length > 0) && (
        <>
          <h2 className="font-sans text-[10px] tracking-widest2 uppercase text-white/45 mb-3">
            Generating
          </h2>
          <div className="mb-8">
            {[...queue!.approved, ...queue!.working].map((job) => (
              <Card key={job.id} job={job}>
                <p className="font-sans text-white/45 text-[11px] mt-2">
                  {job.status === "approved"
                    ? "Approved — waiting for the booth laptop to pick it up."
                    : job.videoUrl
                      ? "Video delivered."
                      : job.stillUrl
                        ? "Still delivered, video rendering."
                        : "Generating…"}
                </p>
              </Card>
            ))}
          </div>
        </>
      )}

      {queue!.done.length > 0 && (
        <>
          <h2 className="font-sans text-[10px] tracking-widest2 uppercase text-white/45 mb-3">
            Delivered
          </h2>
          {queue!.done.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between border-b border-white/8 py-2.5"
            >
              <p className="font-sans text-white/60 text-xs">
                <span className="font-geist font-black text-white uppercase">{job.name}</span>{" "}
                · {job.world} · {job.power}
              </p>
              <p className="font-mono text-white/35 text-[11px]">{job.id}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
