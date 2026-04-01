"use client";

import { type Transaction } from "@/lib/data";
import { SpendingByCategoryChart } from "./spending-category-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function ReportsView({ transactions }: { transactions: Transaction[] }) {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
  return (
    <main className="flex-1 space-y-6 bg-background/50 p-4 sm:p-6">
        <Tabs defaultValue="spending">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="spending">Spending by Category</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="spending">
                <Card>
                    <CardHeader>
                        <CardTitle>Spending by Category</CardTitle>
                        <CardDescription>
                        A doughnut chart showing spending by category.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SpendingByCategoryChart data={expenseTransactions} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="trends">
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                        <CardDescription>
                        Monthly spending trends will be shown here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-96 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart coming soon!</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </main>
  );
}
