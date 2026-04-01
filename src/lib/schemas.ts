import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Please select a transaction type.",
  }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  category: z.string().min(1, { message: "Please select a category." }),
  notes: z.string().max(100, "Notes must be 100 characters or less.").optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
