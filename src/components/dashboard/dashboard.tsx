"use client";

import * as React from "react";
import { type Transaction } from "@/lib/data";
import { BudgetOverview } from "./budget-overview";
import { RecentTransactions } from "./recent-transactions";

export function Dashboard({ transactions }: { transactions: Transaction[] }) {

  return (
    <main className="flex-1 space-y-6 bg-background/50 p-4 sm:p-6">
      <BudgetOverview transactions={transactions} />
      <RecentTransactions transactions={transactions} />
    </main>
  );
}
