import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { ShareCard } from "./ShareCard";
export function ShareModal({ open, question, result, onClose, onReroll }) {
    const cardRef = useRef(null);
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
        }
        finally {
            setIsExporting(false);
        }
    };
    return (_jsx("div", { className: "modal-backdrop", role: "presentation", onClick: onClose, children: _jsxs("div", { className: "share-modal", role: "dialog", "aria-modal": "true", onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "share-modal__header", children: [_jsxs("div", { children: [_jsx("p", { className: "share-modal__eyebrow", children: "\u751F\u6210\u7ED3\u679C\u5361\u7247" }), _jsx("h3", { children: "\u4FDD\u5B58\u8FD9\u4E00\u523B\u7684\u51B3\u5B9A" })] }), _jsx("button", { type: "button", className: "icon-button", onClick: onClose, "aria-label": "\u5173\u95ED", children: "\u00D7" })] }), _jsx("div", { className: "share-modal__preview", children: _jsx("div", { ref: cardRef, children: _jsx(ShareCard, { question: question, result: result }) }) }), _jsx("p", { className: "share-modal__hint", children: "\u957F\u6309\u56FE\u7247\u4FDD\u5B58\uFF0C\u6216\u70B9\u4E0B\u65B9\u6309\u94AE\u4E0B\u8F7D\u5230\u672C\u5730\u3002" }), _jsxs("div", { className: "share-modal__actions", children: [_jsx("button", { type: "button", className: "secondary-button", onClick: exportImage, disabled: isExporting, children: isExporting ? "正在生成…" : "保存图片" }), _jsx("button", { type: "button", className: "ghost-button", onClick: onReroll, children: "\u518D\u51B3\u5B9A\u4E00\u6B21" })] })] }) }));
}
