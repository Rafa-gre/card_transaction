'use client'

import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import ChevronDownIcon from "../Icons/ChevronDown";
import { useCallback, useEffect, useState } from "react";
import { fetchTransactions } from "@/api/api";
import { useToast } from "../ui/use-toast";
import FilterBar from "../FilterBar/FilterBar";
import { Transaction, TransactionType } from "@/types/TransactionTypes";
import { format } from "date-fns";

export default function TablePage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Record<string, string | undefined> | undefined>();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchTransactions(filter);
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: `Erro ao buscar cliente: ${error}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [toast, filter]);
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function formatDateTime(dateTimeString: string) {
    return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm:ss');
  }

  function formatCurrency(value: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formatter.format(value);
  }

  const formatType = {
    [TransactionType.CREDIT]: 'Crédito',
    [TransactionType.DEBIT]: 'Débito'
  };
  

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-14 px-4 border-b lg:h-20 dark:border-gray-800 bg-fuchsia-800 text-white rounded-lg">
        <Button className="rounded-md w-8 h-8 mr-2 lg:hidden" variant="default"> 
          <ChevronDownIcon className="w-4 h-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h2 className="font-semibold text-lg lg:text-2xl ml-4">Lista de Transações</h2>
      </header>
      <div className="flex items-center p-4">
        <div className="flex justify-evenly border rounded-lg bg-fuchsia-700 w-full">
        <h2 className="flex items-center p-4 text-white font-semibold">Filtrar</h2>
          <FilterBar setFilter={setFilter} />
        </div>
      </div>
      <main className="flex-1 p-4 grid items-start gap-4 md:p-6 ">
        <div className="border rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Valor</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Data de Criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.idempotencyId}>
                  <TableCell className="text-center">{transaction.idempotencyId}</TableCell>
                  <TableCell className="text-center">{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell className="text-center">{formatType[transaction.type]}</TableCell>
                  <TableCell className="text-center">{formatDateTime(transaction.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
