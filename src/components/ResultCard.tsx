import type { DecisionResult } from "../utils/decide.js";

type ResultCardProps = {
  question: string;
  result: DecisionResult;
  onOpenShare: () => void;
  onReroll: () => void;
};

export function ResultCard({
  question,
  result,
  onOpenShare,
  onReroll,
}: ResultCardProps) {
  return (
    <section className="result-card reveal">
      <p className="result-kicker">你问的是</p>
      <p className="result-question">{question}</p>
      <p className="result-decision-kicker">决定：</p>
      <p className="decision decision-animate">{result.label}</p>
      <p className="result-reason">{result.reason}</p>
      <div className="result-actions">
        <button type="button" className="secondary-button" onClick={onOpenShare}>
          生成我的决定卡片
        </button>
        <button type="button" className="text-button" onClick={onReroll}>
          换一个问题
        </button>
      </div>
    </section>
  );
}
