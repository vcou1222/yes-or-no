import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { DecisionInput } from "./components/DecisionInput.js";
import { ResultCard } from "./components/ResultCard.js";
import { ShareModal } from "./components/ShareModal.js";
import { decide } from "./utils/decide.js";
export default function App() {
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [shareOpen, setShareOpen] = useState(false);
    const resultRef = useRef(null);
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
    return (_jsxs("main", { className: "app-shell", children: [_jsx("div", { className: "glow glow-one" }), _jsx("div", { className: "glow glow-two" }), _jsxs("div", { className: "app-card", children: [_jsxs("header", { className: "hero", children: [_jsx("h1", { className: "hero-title", children: "YES OR NO" }), _jsx("p", { className: "hero-subtitle", children: "\u522B\u60F3\u4E86" }), _jsx("p", { className: "hero-subtitle hero-subtitle--strong", children: "\u6211\u5E2E\u4F60\u51B3\u5B9A" }), _jsxs("p", { className: "hero-copy", children: ["\u5199\u4E0B\u4F60\u7EA0\u7ED3\u7684\u4E8B\u60C5", _jsx("br", {}), "\u6211\u66FF\u4F60\u505A\u8FD9\u4E2A\u51B3\u5B9A"] })] }), _jsx(DecisionInput, { value: question, isLoading: isLoading, isShaking: isShaking, errorText: errorText, onChange: setQuestion, onSubmit: handleSubmit, placeholderIndex: placeholderIndex }), errorText ? _jsx("p", { className: "inline-hint error-hint", children: errorText }) : null, result ? (_jsx("div", { ref: resultRef, className: "result-anchor", children: _jsx(ResultCard, { question: trimmedQuestion, result: result, onOpenShare: handleOpenShare, onReroll: handleReroll }) })) : null, _jsx("p", { className: "privacy-note privacy-note--soft", children: "\u4E0D\u4F1A\u4FDD\u5B58\u4F60\u7684\u95EE\u9898\uFF0C\u53EA\u66FF\u4F60\u51B3\u5B9A\u8FD9\u4E00\u523B\u3002" }), _jsx("p", { className: "privacy-note privacy-note--bottom", children: "\u91CD\u5927\u533B\u7597\u3001\u6CD5\u5F8B\u3001\u6295\u8D44\u95EE\u9898\uFF0C\u8BF7\u81EA\u884C\u5224\u65AD\u3002" })] }), _jsx(ShareModal, { open: shareOpen, question: trimmedQuestion, result: result, onClose: () => setShareOpen(false), onReroll: handleReroll })] }));
}
