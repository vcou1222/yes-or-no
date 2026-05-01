import { useEffect, useMemo, useRef, useState } from "react";
import { DecisionInput } from "./components/DecisionInput.js";
import { ResultCard } from "./components/ResultCard.js";
import { ShareModal } from "./components/ShareModal.js";
import { decide, type DecisionResult } from "./utils/decide.js";

export default function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((value) => (value + 1) % 5);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = shareOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shareOpen]);

  useEffect(() => {
    if (!result) {
      return;
    }

    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [result]);

  const trimmedQuestion = question.trim();
  const handleSubmit = () => {
    if (isLoading) {
      return;
    }

    if (trimmedQuestion.length < 2) {
      setErrorText("先把你纠结的事写下来");
      setIsShaking(true);
      window.setTimeout(() => setIsShaking(false), 520);
      window.setTimeout(() => setErrorText(null), 1800);
      return;
    }

    setErrorText(null);
    setIsLoading(true);
    setIsShaking(false);

    window.setTimeout(() => {
      const next = decide(trimmedQuestion);
      setResult(next);
      setIsLoading(false);
    }, 1000);
  };

  const handleReroll = () => {
    setShareOpen(false);
    setResult(null);
    setQuestion("");
    setErrorText(null);
  };

  const handleOpenShare = () => {
    setShareOpen(true);
  };

  return (
    <main className="app-shell">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <div className="app-card">
        <header className="hero">
          <h1 className="hero-title">YES OR NO</h1>
          <p className="hero-subtitle">别想了</p>
          <p className="hero-subtitle hero-subtitle--strong">我帮你决定</p>
          <p className="hero-copy">
            写下你纠结的事情
            <br />
            我替你做这个决定
          </p>
        </header>

        <DecisionInput
          value={question}
          isLoading={isLoading}
          isShaking={isShaking}
          errorText={errorText}
          onChange={setQuestion}
          onSubmit={handleSubmit}
          placeholderIndex={placeholderIndex}
        />

        {errorText ? <p className="inline-hint error-hint">{errorText}</p> : null}

        {result ? (
          <div ref={resultRef} className="result-anchor">
            <ResultCard
              question={trimmedQuestion}
              result={result}
              onOpenShare={handleOpenShare}
              onReroll={handleReroll}
            />
          </div>
        ) : null}

        <p className="privacy-note privacy-note--soft">不会保存你的问题，只替你决定这一刻。</p>
        <p className="privacy-note privacy-note--bottom">
          重大医疗、法律、投资问题，请自行判断。
        </p>
      </div>

      <ShareModal
        open={shareOpen}
        question={trimmedQuestion}
        result={result}
        onClose={() => setShareOpen(false)}
        onReroll={handleReroll}
      />
    </main>
  );
}
