"use server";

import { getSpendingInsights, SpendingInsightsInput } from "@/ai/flows/spending-insights-flow";

export async function getSpendingInsightsAction(input: SpendingInsightsInput) {
  try {
    const insights = await getSpendingInsights(input);
    return { success: true, data: insights };
  } catch (error) {
    console.error("Error getting spending insights:", error);
    // It's better to return a generic error message to the client
    return { success: false, error: "An unexpected error occurred while analyzing your spending. Please try again later." };
  }
}
