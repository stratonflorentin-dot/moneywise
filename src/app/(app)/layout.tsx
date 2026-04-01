"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePlus,
  LayoutDashboard,
  Settings,
  AreaChart,
  Lightbulb,
  Plus
} from "lucide-react";
import { type Category, type Transaction } from "@/lib/data";
import { initialCategories, initialTransactions } from "@/lib/mock-data";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { AddTransactionSheet } from "@/components/dashboard/add-transaction-sheet";
import { SpendingInsightsDialog } from "@/components/dashboard/spending-insights-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions);
  const [categories, setCategories] = React.useState<Category[]>(initialCategories);
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const [isInsightsOpen, setInsightsOpen] = React.useState(false);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...transaction, id: crypto.randomUUID() },
      ...prev,
    ]);
  };
  
  const formattedTransactionsForAI = transactions.map(t => ({
    ...t,
    date: t.date.toISOString(),
  }));

  const pageTitle = pathname.split('/').pop();
  const capitalizedTitle = pageTitle ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) : 'Dashboard';

  return (
    <SidebarProvider>
      <AddTransactionSheet
        isOpen={isSheetOpen}
        setIsOpen={setSheetOpen}
        addTransaction={addTransaction}
        categories={categories}
      />
      <SpendingInsightsDialog 
        isOpen={isInsightsOpen}
        setIsOpen={setInsightsOpen}
        transactions={formattedTransactionsForAI}
      />

      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo className="size-8 text-sidebar-primary" />
              <span className="text-lg font-semibold text-sidebar-foreground">
                MoneyWise
              </span>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" className="w-full">
                <SidebarMenuButton isActive={pathname.startsWith('/dashboard')}>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/reports" className="w-full">
                    <SidebarMenuButton isActive={pathname.startsWith('/reports')}>
                        <AreaChart />
                        Reports
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setSheetOpen(true)} className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground">
                <FilePlus />
                New Transaction
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Avatar className="size-7">
                  <AvatarImage src="https://picsum.photos/seed/12/100/100" data-ai-hint="profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                John Doe
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
         <header className="flex items-center justify-between border-b p-4 sm:p-6">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
            <h1 className="text-2xl font-bold">{capitalizedTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setInsightsOpen(true)}>
              <Lightbulb className="mr-2 size-4" />
              Spending Insights
            </Button>
            <Button onClick={() => setSheetOpen(true)}>
              <Plus className="mr-2 size-4" /> Add Transaction
            </Button>
          </div>
        </header>
        {/* Pass state to children pages */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { transactions, categories, setTransactions } as any);
          }
          return child;
        })}
      </SidebarInset>
    </SidebarProvider>
  );
}
