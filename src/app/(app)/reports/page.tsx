import { ReportsView } from '@/components/reports/reports-view';
import { type Transaction } from '@/lib/data';

export default function ReportsPage({ transactions = [] }: { transactions?: Transaction[] }) {
  return <ReportsView transactions={transactions} />;
}
