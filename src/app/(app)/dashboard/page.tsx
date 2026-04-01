import { Dashboard } from '@/components/dashboard/dashboard';
import { type Transaction } from '@/lib/data';

// This page component will receive props from the layout
export default function DashboardPage({ transactions = [] }: { transactions?: Transaction[] }) {
  return <Dashboard transactions={transactions} />;
}
