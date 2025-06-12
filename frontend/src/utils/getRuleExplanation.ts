import { rules } from "./rules";

export interface GroupedExplanation {
  title: string;
  explanation: string;
  category: string;
}

export const getGroupedRuleExplanations = (text: string): GroupedExplanation[] => {
  const results: GroupedExplanation[] = [];

  for (const rule of rules) {
    for (const keyword of rule.keyword) {
      if (text.includes(keyword)) {
        results.push({
          title: rule.title,
          explanation: rule.explanation,
          category: rule.category || "Бусад"
        });
        break;
      }
    }
  }

  return results;
};
