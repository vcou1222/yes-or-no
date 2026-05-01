import { categoryKeywords, categoryReasons, decisionLabels, decisionWeights, genericReasons, } from "../data/reasons.js";
export function detectCategory(question) {
    for (const [category, pattern] of Object.entries(categoryKeywords)) {
        if (pattern.test(question)) {
            return category;
        }
    }
    return "general";
}
export function pickWeightedDecision() {
    const roll = Math.random();
    let cumulative = 0;
    for (const decisionType of Object.keys(decisionWeights)) {
        cumulative += decisionWeights[decisionType];
        if (roll <= cumulative) {
            return decisionType;
        }
    }
    return "wait";
}
function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)] ?? items[0];
}
export function decide(question) {
    const category = detectCategory(question);
    const type = pickWeightedDecision();
    const bucket = category === "general" ? genericReasons[type] : categoryReasons[category][type];
    const fallback = genericReasons[type];
    return {
        type,
        label: decisionLabels[type],
        reason: pickRandom(bucket.length > 0 ? bucket : fallback),
        category,
    };
}
