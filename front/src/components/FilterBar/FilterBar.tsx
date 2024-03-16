import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { TransactionType } from '@/types/TransactionTypes';
import { DatePickerWithRange } from '../DatePickerWithRange/DatePickerWithRange';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface FilterBarProps {
  setFilter: Dispatch<SetStateAction<{ [key: string]: string | undefined } | undefined>>;
}

export default function FilterBar({ setFilter }: FilterBarProps) {
  const [selectedType, setSelectedType] = useState<string | undefined>('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleTypeChange = (newValue: string) => {
    setSelectedType(newValue === "clear" ? undefined : newValue);
  };

  useEffect(() => {
    setFilter({
      type: selectedType || undefined,
      startDate: date?.from ? date.from.toISOString() : '',
      endDate: date?.to ? date.to.toISOString() : ''
    });
  }, [selectedType, date, setFilter]);

  return (
    <div className="flex  justify-between space-x-10 m-4">
      <div >
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="border-white bg-white min-w-[240px]">
            <SelectValue placeholder="Selecione o tipo de transação">{selectedType === TransactionType.CREDIT ? 'Crédito' : selectedType === TransactionType.DEBIT ? 'Débito' :  'Nenhum filtro'}</SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Tipo de Transação</SelectLabel>
              <SelectItem value={TransactionType.CREDIT}>Crédito</SelectItem>
              <SelectItem value={TransactionType.DEBIT}>Débito</SelectItem>
              <SelectItem value="clear">Nenhum filtro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DatePickerWithRange setDate={setDate} date={date}/>
    </div>
  );
}
