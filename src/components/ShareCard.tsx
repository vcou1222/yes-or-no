import type { DecisionResult } from "../utils/decide";

type ShareCardProps = {
  question: string;
  result: DecisionResult;
};

export function ShareCard({ question, result }: ShareCardProps) {
  return (
    <article className="share-card" aria-label="决定分享卡片">
      <div className="share-card__brand">YES OR NO</div>
      <h3 className="share-card__title">这一次，我不想自己选了</h3>
      <div className="share-card__block">
        <span className="share-card__label">我问：</span>
        <p>{question}</p>
      </div>
      <div className="share-card__block">
        <span className="share-card__label">它说：</span>
        <p className="share-card__decision">{result.label}</p>
      </div>
      <p className="share-card__reason">{result.reason}</p>
      <div className="share-card__footer">YES OR NO｜别想了，我帮你决定</div>
    </article>
  );
}
