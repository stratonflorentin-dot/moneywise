'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing user financial transactions to provide personalized spending insights.
 *
 * - getSpendingInsights - A function that analyzes transaction history and provides financial insights.
 * - SpendingInsightsInput - The input type for the getSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the getSpendingInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SpendingInsightsInputSchema = z.object({
  transactions: z.array(z.object({
    id: z.string().describe('Unique identifier for the transaction.'),
    amount: z.number().describe('The amount of the transaction.'),
    type: z.enum(['income', 'expense']).describe('Whether the transaction is an income or an expense.'),
    category: z.string().describe('The category of the transaction (e.g., "Groceries", "Salary").'),
    date: z.string().datetime().describe('The date and time of the transaction in ISO 8601 format.'),
    notes: z.string().optional().describe('Additional notes about the transaction.'),
  })).describe('An array of financial transactions to be analyzed.'),
  startDate: z.string().datetime().optional().describe('Optional: The start date (ISO 8601) for the analysis period.'),
  endDate: z.string().datetime().optional().describe('Optional: The end date (ISO 8601) for the analysis period.'),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  overallSummary: z.string().describe('A concise overall summary of the user\'s financial habits based on the transactions.'),
  spendingPatterns: z.array(z.string()).describe('A list of observed spending patterns, such as recurring expenses, peak spending times, or frequent categories.'),
  potentialSavingAreas: z.array(z.string()).describe('A list of actionable suggestions for saving money based on spending analysis.'),
  categoryBreakdown: z.array(z.object({
    category: z.string().describe('The name of the spending category.'),
    totalAmount: z.number().describe('The total amount spent or earned in this category.'),
    type: z.enum(['income', 'expense']).describe('Whether this breakdown is for income or expense.'),
    percentageOfTotal: z.number().describe('The percentage of total income or total expenses this category represents.'),
  })).describe('A detailed breakdown of spending and income by category, including total amounts and percentages.'),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function getSpendingInsights(input: SpendingInsightsInput): Promise<SpendingInsightsOutput> {
  return spendingInsightsFlow(input);
}

const spendingInsightsPrompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: { schema: SpendingInsightsInputSchema },
  output: { schema: SpendingInsightsOutputSchema },
  prompt: `You are a highly intelligent and helpful financial advisor. Your task is to analyze the provided financial transactions and offer personalized insights into spending habits, identify patterns, and suggest potential areas for saving money.

Here is the transaction history:
{{#each transactions}}
- Type: {{this.type}}, Amount: {{this.amount}}, Category: {{this.category}}, Date: {{this.date}}, Notes: "{{this.notes}}"
{{/each}}

{{#if startDate}}
Focus your analysis on transactions from {{startDate}} to {{endDate}}.
{{/if}}

Based on this data, provide the following:
1.  A concise overall summary of the user's financial habits.
2.  A list of observed spending patterns.
3.  A list of actionable suggestions for saving money.
4.  A detailed breakdown of spending and income by category, including total amounts and percentages.

Ensure your response is structured exactly according to the provided JSON schema.`,
});

const spendingInsightsFlow = ai.defineFlow(
  {
    name: 'spendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await spendingInsightsPrompt(input);
    return output!;
  }
);
