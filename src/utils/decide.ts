import {
  categoryKeywords,
  categoryReasons,
  decisionLabels,
  decisionWeights,
  genericReasons,
  type DecisionCategory,
  type DecisionType,
} from "../data/reasons";

export type DecisionResult = {
  type: DecisionType;
  label: string;
  reason: string;
  category: DecisionCategory;
};

export function detectCategory(question: string): DecisionCategory {
  for (const [category, pattern] of Object.entries(categoryKeywords)) {
    if (pattern.test(question)) {
      return category as Exclude<DecisionCategory, "general">;
    }
  }

  return "general";
}

export function pickWeightedDecision(): DecisionType {
  const roll = Math.random();
  let cumulative = 0;

  for (const decisionType of Object.keys(decisionWeights) as DecisionType[]) {
    cumulative += decisionWeights[decisionType];
    if (roll <= cumulative) {
      return decisionType;
    }
  }

  return "wait";
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0]!;
}

export function decide(question: string): DecisionResult {
  const category = detectCategory(question);
  const type = pickWeightedDecision();
  const bucket =
    category === "general" ? genericReasons[type] : categoryReasons[category][type];
  const fallback = genericReasons[type];

  return {
    type,
    label: decisionLabels[type],
    reason: pickRandom(bucket.length > 0 ? bucket : fallback),
    category,
  };
}
