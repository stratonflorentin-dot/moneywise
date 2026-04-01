export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: Date;
  category: string;
  notes?: string;
};

export type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
};
