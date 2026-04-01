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

export const initialCategories: Category[] = [
  { id: "1", name: "Salary", type: "income" },
  { id: "2", name: "Freelance", type: "income" },
  { id: "3", name: "Investment", type: "income" },
  { id: "4", name: "Groceries", type: "expense" },
  { id: "5", name: "Rent", type: "expense" },
  { id: "6", name: "Utilities", type: "expense" },
  { id: "7", name: "Transport", type: "expense" },
  { id: "8", name: "Entertainment", type: "expense" },
  { id: "9", name: "Dining Out", type: "expense" },
  { id: "10", name: "Health", type: "expense" },
  { id: "11", name: "Shopping", type: "expense" },
  { id: "12", name: "Investment", type: "expense" },
];

const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

export const initialTransactions: Transaction[] = [
    { id: '1', amount: 4500, date: new Date(firstDayOfMonth.setDate(1)), type: 'income', category: 'Salary', notes: 'Monthly salary' },
    { id: '2', amount: 175.50, date: new Date(firstDayOfMonth.setDate(2)), type: 'expense', category: 'Groceries', notes: 'Weekly grocery shopping' },
    { id: '3', amount: 1200, date: new Date(firstDayOfMonth.setDate(5)), type: 'expense', category: 'Rent' },
    { id: '4', amount: 55.20, date: new Date(firstDayOfMonth.setDate(7)), type: 'expense', category: 'Dining Out', notes: 'Dinner with friends' },
    { id: '5', amount: 45.00, date: new Date(firstDayOfMonth.setDate(10)), type: 'expense', category: 'Transport', notes: 'Monthly bus pass' },
    { id: '6', amount: 750, date: new Date(firstDayOfMonth.setDate(15)), type: 'income', category: 'Freelance', notes: 'Web design project' },
    { id: '7', amount: 85.80, date: new Date(firstDayOfMonth.setDate(16)), type: 'expense', category: 'Utilities', notes: 'Electricity and Gas bill' },
    { id: '8', amount: 35, date: new Date(firstDayOfMonth.setDate(18)), type: 'expense', category: 'Entertainment', notes: 'Movie night' },
    { id: '9', amount: 250, date: new Date(firstDayOfMonth.setDate(20)), type: 'expense', category: 'Shopping', notes: 'New clothes' },
    { id: '10', amount: 65, date: new Date(firstDayOfMonth.setDate(22)), type: 'expense', category: 'Health', notes: 'Pharmacy' },
    { id: '11', amount: 500, date: new Date(firstDayOfMonth.setDate(25)), type: 'expense', category: 'Investment', notes: 'Stock market' },
];
