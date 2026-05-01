import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import type { DecisionResult } from "../utils/decide";
import { ShareCard } from "./ShareCard";

type ShareModalProps = {
  open: boolean;
  question: string;
  result: DecisionResult | null;
  onClose: () => void;
  onReroll: () => void;
};

export function ShareModal({ open, question, result, onClose, onReroll }: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!open || !result) {
    return null;
  }

  const exportImage = async () => {
    if (!cardRef.current || isExporting) {
      return;
    }

    try {
      setIsExporting(true);
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `yes-or-no-${Date.now()}.png`;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="share-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="share-modal__header">
          <div>
            <p className="share-modal__eyebrow">生成结果卡片</p>
            <h3>保存这一刻的决定</h3>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        <div className="share-modal__preview">
          <div ref={cardRef}>
            <ShareCard question={question} result={result} />
          </div>
        </div>

        <p className="share-modal__hint">长按图片保存，或点下方按钮下载到本地。</p>

        <div className="share-modal__actions">
          <button type="button" className="secondary-button" onClick={exportImage} disabled={isExporting}>
            {isExporting ? "正在生成…" : "保存图片"}
          </button>
          <button type="button" className="ghost-button" onClick={onReroll}>
            再决定一次
          </button>
        </div>
      </div>
    </div>
  );
}
