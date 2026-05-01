import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --ink: #0f0e0d; --cream: #f5f0e8; --gold: #c9a84c; --gold-light: #e8d5a3; --rust: #b5451b; --paper: #faf7f2; --shadow: rgba(15,14,13,0.12); }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; }
  .app { min-height: 100vh; background: var(--cream); background-image: radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(181,69,27,0.1) 0%, transparent 50%); }
  .header { padding: 32px 40px 0; display: flex; align-items: flex-start; justify-content: space-between; }
  .logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: var(--ink); }
  .logo span { color: var(--gold); }
  .badge { background: var(--ink); color: var(--gold); font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; }
  .hero { text-align: center; padding: 48px 24px 36px; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 6vw, 64px); font-weight: 900; color: var(--ink); line-height: 1.05; letter-spacing: -1px; margin-bottom: 16px; }
  .hero h1 em { font-style: italic; color: var(--gold); }
  .hero p { font-size: 16px; color: #5a5650; font-weight: 300; max-width: 480px; margin: 0 auto; line-height: 1.6; }
  .steps { display: flex; justify-content: center; padding: 0 24px 40px; max-width: 600px; margin: 0 auto; }
  .step-item { display: flex; align-items: center; flex: 1; }
  .step-dot { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d4cfc7; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #b0aa9f; background: var(--cream); flex-shrink: 0; transition: all 0.3s; }
  .step-dot.active { border-color: var(--gold); background: var(--gold); color: var(--ink); }
  .step-dot.done { border-color: var(--ink); background: var(--ink); color: var(--cream); }
  .step-line { flex: 1; height: 2px; background: #d4cfc7; transition: background 0.3s; }
  .step-line.done { background: var(--ink); }
  .card { max-width: 680px; margin: 0 auto 60px; background: var(--paper); border: 1px solid #e0d9cf; border-radius: 4px; padding: 40px; box-shadow: 0 4px 32px var(--shadow); position: relative; }
  .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--rust)); border-radius: 4px 4px 0 0; }
  .section-label { font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field.span2 { grid-column: span 2; }
  label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #7a746b; }
  input, textarea { font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--ink); background: var(--cream); border: 1.5px solid #d4cfc7; border-radius: 3px; padding: 12px 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical; width: 100%; }
  input:focus, textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }
  textarea { min-height: 110px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; padding: 14px 28px; border: none; border-radius: 3px; cursor: pointer; transition: all 0.2s; }
  .btn-primary { background: var(--ink); color: var(--gold); }
  .btn-primary:hover { background: #1e1c1a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(15,14,13,0.2); }
  .btn-primary:disabled { background: #b0aa9f; color: #e0d9cf; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-ghost { background: transparent; color: var(--ink); border: 1.5px solid #d4cfc7; }
  .btn-ghost:hover { border-color: var(--ink); }
  .btn-gold { background: var(--gold); color: var(--ink); }
  .btn-gold:hover { background: #b8952e; transform: translateY(-1px); }
  .actions { display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e0d9cf; }
  .doc-types { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  .doc-type { padding: 16px 20px; border: 2px solid #d4cfc7; border-radius: 3px; cursor: pointer; transition: all 0.2s; background: var(--cream); }
  .doc-type:hover { border-color: var(--gold-light); }
  .doc-type.selected { border-color: var(--gold); background: rgba(201,168,76,0.06); }
  .doc-type-icon { font-size: 24px; margin-bottom: 6px; }
  .doc-type-name { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .doc-type-desc { font-size: 12px; color: #7a746b; }
  .loading-state { text-align: center; padding: 60px 20px; }
  .spinner { width: 48px; height: 48px; border: 3px solid #e0d9cf; border-top-color: var(--gold); border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 24px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--ink); margin-bottom: 8px; }
  .loading-sub { font-size: 14px; color: #7a746b; }
  .result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .result-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--ink); }
  .copy-btn { font-size: 12px; font-weight: 600; padding: 8px 16px; background: var(--ink); color: var(--gold); border: none; border-radius: 2px; cursor: pointer; }
  .result-box { background: #fff; border: 1px solid #e0d9cf; border-radius: 3px; padding: 32px; font-size: 14px; line-height: 1.85; color: #2a2825; white-space: pre-wrap; max-height: 460px; overflow-y: auto; }
  .score-bar { display: flex; align-items: center; gap: 12px; margin-top: 16px; padding: 14px 16px; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25); border-radius: 3px; }
  .score-text { font-size: 13px; color: #5a5650; flex: 1; }
  .score-num { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--gold); }
  .error-box { background: rgba(181,69,27,0.06); border: 1px solid rgba(181,69,27,0.2); border-radius: 3px; padding: 16px 20px; color: var(--rust); font-size: 14px; margin-top: 16px; }
  .tip-row { display: flex; gap: 8px; padding: 12px 16px; background: rgba(15,14,13,0.03); border-radius: 3px; margin-bottom: 16px; font-size: 13px; color: #5a5650; }
  @media (max-width: 600px) {
    .card { padding: 24px 20px; margin: 0 16px 60px; }
    .form-grid { grid-template-columns: 1fr; }
    .field.span2 { grid-column: span 1; }
    .doc-types { grid-template-columns: 1fr; }
    .header { padding: 20px 20px 0; }
  }
`;

const DOC_TYPES = [
  { id: "cover_letter", icon: "✉️", name: "Cover Letter", desc: "Tailored letter for a specific job" },
  { id: "resume_summary", icon: "📄", name: "Resume Summary", desc: "Professional profile statement" },
  { id: "linkedin_about", icon: "💼", name: "LinkedIn About", desc: "Compelling LinkedIn bio" },
  { id: "cold_email", icon: "🚀", name: "Cold Outreach", desc: "Email to recruiter or company" },
];

const TONES = ["Professional", "Enthusiastic", "Confident", "Warm & Personable", "Direct & Concise"];
const STEPS = ["Document", "Your Info", "Job Details", "Result"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [docType, setDocType] = useState("cover_letter");
  const [tone, setTone] = useState("Professional");
  const [form, setForm] = useState({
    name: "", role: "", experience: "", skills: "", achievement: "",
    company: "", jobTitle: "", jobDesc: "", whyCompany: ""
  });
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const buildPrompt = () => {
    const label = DOC_TYPES.find(d => d.id === docType)?.name;
    return `You are an expert career coach. Write a complete, polished ${label} with a ${tone} tone.

Candidate: ${form.name || "the candidate"}, targeting ${form.role}, ${form.experience} of experience.
Skills: ${form.skills}. Key achievement: ${form.achievement || "N/A"}.
Target: ${form.company} — ${form.jobTitle}.
Job description: ${form.jobDesc || "N/A"}.
Why this company: ${form.whyCompany || "N/A"}.

Rules: Write only the final document. Be specific, never use placeholder text. Reference the company and role naturally.
After the document add exactly this line: MATCH_SCORE: [number 1-100]`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    setScore(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      const text = data.text || "";
      if (!text) throw new Error("Empty response from AI");

      const m = text.match(/MATCH_SCORE:\s*(\d+)/);
      if (m) {
        setScore(parseInt(m[1]));
        setResult(text.replace(/\nMATCH_SCORE:\s*\d+\n?/, "").trim());
      } else {
        setResult(text.trim());
      }
      setStep(3);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep(0); setResult(""); setScore(null); setError("");
  };

  const canStep2 = form.name && form.role && form.experience && form.skills;
  const canGenerate = form.company && form.jobTitle;

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="header">
          <div>
            <div className="logo">Letter<span>Forge</span></div>
            <div style={{ fontSize: 11, color: "#9a9488", marginTop: 2, fontWeight: 300 }}>AI Career Documents</div>
          </div>
          <div className="badge">AI Powered</div>
        </div>

        <div className="hero">
          <h1>Land your next<br /><em>dream job</em></h1>
          <p>Professional cover letters, resume summaries & outreach emails — tailored to any role in seconds.</p>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={i} className="step-item">
              <div className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
            </div>
          ))}
        </div>

        <div className="card">

          {step === 0 && (
            <>
              <div className="section-label">Step 1 — Choose document type</div>
              <div className="doc-types">
                {DOC_TYPES.map(d => (
                  <div key={d.id} className={`doc-type ${docType === d.id ? "selected" : ""}`} onClick={() => setDocType(d.id)}>
                    <div className="doc-type-icon">{d.icon}</div>
                    <div className="doc-type-name">{d.name}</div>
                    <div className="doc-type-desc">{d.desc}</div>
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 10, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#7a746b" }}>Writing Tone</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TONES.map(t => (
                    <button key={t} onClick={() => setTone(t)} style={{ padding: "7px 14px", border: `1.5px solid ${tone === t ? "var(--gold)" : "#d4cfc7"}`, borderRadius: 2, background: tone === t ? "rgba(201,168,76,0.1)" : "transparent", cursor: "pointer", fontSize: 13, fontWeight: 500, color: tone === t ? "var(--ink)" : "#7a746b", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="actions">
                <div />
                <button className="btn btn-primary" onClick={() => setStep(1)}>Continue →</button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="section-label">Step 2 — About you</div>
              <div className="form-grid">
                <div className="field"><label>Full Name *</label><input placeholder="e.g. Alex Johnson" value={form.name} onChange={e => update("name", e.target.value)} /></div>
                <div className="field"><label>Target Role *</label><input placeholder="e.g. Senior Product Manager" value={form.role} onChange={e => update("role", e.target.value)} /></div>
                <div className="field"><label>Years of Experience *</label><input placeholder="e.g. 5 years" value={form.experience} onChange={e => update("experience", e.target.value)} /></div>
                <div className="field"><label>Top Skills *</label><input placeholder="e.g. React, Node.js, AWS" value={form.skills} onChange={e => update("skills", e.target.value)} /></div>
                <div className="field span2"><label>Best Achievement (optional)</label><textarea placeholder="e.g. Grew revenue by 40% in 12 months..." value={form.achievement} onChange={e => update("achievement", e.target.value)} style={{ minHeight: 80 }} /></div>
              </div>
              <div className="actions">
                <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!canStep2}>Continue →</button>
              </div>
            </>
          )}

          {step === 2 && !loading && (
            <>
              <div className="section-label">Step 3 — Job details</div>
              <div className="tip-row"><span>💡</span> Paste the actual job description for best results.</div>
              <div className="form-grid">
                <div className="field"><label>Company Name *</label><input placeholder="e.g. Stripe" value={form.company} onChange={e => update("company", e.target.value)} /></div>
                <div className="field"><label>Job Title *</label><input placeholder="e.g. Backend Engineer" value={form.jobTitle} onChange={e => update("jobTitle", e.target.value)} /></div>
                <div className="field span2"><label>Job Description</label><textarea placeholder="Paste key responsibilities and requirements here..." value={form.jobDesc} onChange={e => update("jobDesc", e.target.value)} /></div>
                <div className="field span2"><label>Why this company?</label><input placeholder="e.g. I admire their developer-first approach..." value={form.whyCompany} onChange={e => update("whyCompany", e.target.value)} /></div>
              </div>
              {error && <div className="error-box">⚠️ {error}</div>}
              <div className="actions">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-primary" onClick={handleGenerate} disabled={!canGenerate}>✨ Generate</button>
              </div>
            </>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <div className="loading-text">Crafting your document…</div>
              <div className="loading-sub">Personalising for {form.company || "your target"}</div>
            </div>
          )}

          {step === 3 && result && (
            <>
              <div className="result-header">
                <div className="result-title">{DOC_TYPES.find(d => d.id === docType)?.icon} Your {DOC_TYPES.find(d => d.id === docType)?.name}</div>
                <button className="copy-btn" onClick={copy}>{copied ? "✓ Copied!" : "Copy"}</button>
              </div>
              <div className="result-box">{result}</div>
              {score && (
                <div className="score-bar">
                  <span>🎯</span>
                  <span className="score-text">AI-estimated match score for this role</span>
                  <span className="score-num">{score}/100</span>
                </div>
              )}
              <div className="actions">
                <button className="btn btn-ghost" onClick={() => { setStep(2); setResult(""); setScore(null); }}>← Edit & Retry</button>
                <button className="btn btn-gold" onClick={reset}>+ New Document</button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
