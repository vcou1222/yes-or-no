import { placeholderList } from "../data/reasons";

type DecisionInputProps = {
  value: string;
  isLoading: boolean;
  isShaking: boolean;
  errorText: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholderIndex: number;
};

export function DecisionInput({
  value,
  isLoading,
  isShaking,
  errorText,
  onChange,
  onSubmit,
  placeholderIndex,
}: DecisionInputProps) {
  const placeholder = placeholderList[placeholderIndex % placeholderList.length];
  const isDisabled = value.trim().length < 2 || isLoading;

  return (
    <section className="input-panel">
      <label className="sr-only" htmlFor="question">
        你在纠结什么
      </label>
      <textarea
        id="question"
        className={`question-input ${isShaking ? "shake" : ""} ${errorText ? "error" : ""}`}
        placeholder={placeholder}
        maxLength={60}
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, 60))}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            onSubmit();
          }
        }}
        aria-describedby="question-help"
      />
      <div className="input-meta" id="question-help">
        <span>{`${value.length}/60`}</span>
      </div>
      <button
        type="button"
        className="primary-button"
        onClick={onSubmit}
        disabled={isDisabled}
      >
        {isLoading ? "✦ 我在想一想…… ✦" : "帮我决定 ✦"}
      </button>
    </section>
  );
}
