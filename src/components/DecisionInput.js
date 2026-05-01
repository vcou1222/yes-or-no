import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { placeholderList } from "../data/reasons";
export function DecisionInput({ value, isLoading, isShaking, errorText, onChange, onSubmit, placeholderIndex, }) {
    const placeholder = placeholderList[placeholderIndex % placeholderList.length];
    const isDisabled = value.trim().length < 2 || isLoading;
    return (_jsxs("section", { className: "input-panel", children: [_jsx("label", { className: "sr-only", htmlFor: "question", children: "\u4F60\u5728\u7EA0\u7ED3\u4EC0\u4E48" }), _jsx("textarea", { id: "question", className: `question-input ${isShaking ? "shake" : ""} ${errorText ? "error" : ""}`, placeholder: placeholder, maxLength: 60, value: value, onChange: (event) => onChange(event.target.value.slice(0, 60)), onKeyDown: (event) => {
                    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                        event.preventDefault();
                        onSubmit();
                    }
                }, "aria-describedby": "question-help" }), _jsx("div", { className: "input-meta", id: "question-help", children: _jsx("span", { children: `${value.length}/60` }) }), _jsx("button", { type: "button", className: "primary-button", onClick: onSubmit, disabled: isDisabled, children: isLoading ? "✦ 我在想一想…… ✦" : "帮我决定 ✦" })] }));
}
