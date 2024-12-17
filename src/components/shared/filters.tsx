import { cn } from '@/lib/utils';
import React from 'react';
import { FilterCheckbox } from './filter-checkbox';
import { Title } from './title';
import { Tabs, TabsList, TabsTrigger } from '../ui';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '@/store/store';
import { fetchTickets } from '@/store/slices/ticketsSlice';

interface Props {
  className?: string;
  changeCurrency: (cur: string) => void;
}

export interface ITransfers {
  all: boolean;
  noTransfer: boolean;
  oneTransfer: boolean;
  twoTransfers: boolean;
  threeTransfers: boolean;
}

const Filters: React.FC<React.PropsWithChildren<Props>> = ({ className, changeCurrency }) => {

  const { control, watch, setValue } = useForm({
    defaultValues: {
      transfers: {
        all: true,
        noTransfer: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      },
    },
  });

  const dispatch = useAppDispatch();
  const transfers = watch('transfers');


  const renderFilter = () => {
    const selectedTransfers = Object.keys(transfers)
      .filter((key) => transfers[key as keyof typeof transfers])
      .map((key) => {
        if (key === 'noTransfer') return 0;
        if (key === 'oneTransfer') return 1;
        if (key === 'twoTransfers') return 2;
        if (key === 'threeTransfers') return 3;
        return -1;
      })
      .filter((value) => value !== -1);

    dispatch(fetchTickets({ transfer: selectedTransfers }));
  };

  const resetOtherFilters = (selectedKey: keyof typeof transfers) => {
    Object.keys(transfers).forEach((key) => {
      setValue(`transfers.${key as keyof typeof transfers}`, key === selectedKey);
    });
    renderFilter();
  };

  const handleCheckboxChange = (name: string) => {
    if (name === 'all') {
      const newTransfersState = { all: true, noTransfer: true, oneTransfer: true, twoTransfers: true, threeTransfers: true };
      Object.keys(newTransfersState).forEach((key) => setValue(`transfers.${key as keyof typeof transfers}`, newTransfersState[key as keyof typeof newTransfersState]));
      dispatch(fetchTickets({ transfer: [0, 1, 2, 3] }));
    } else {
      setValue('transfers.all', false);
      renderFilter();
    }
  };

  const renderCheckbox = (text: string, value: keyof typeof transfers) => (
    <Controller
      key={value}
      name={`transfers.${value}`}
      control={control}
      render={({ field }) => (
        <FilterCheckbox
          text={text}
          value={value}
          checked={field.value}
          resetOtherFilters={resetOtherFilters}
          onCheckedChange={(checked) => {
            field.onChange(checked);
            handleCheckboxChange(value);
          }}
        />
      )}
    />
  );

  return (
    <div className={cn('bg-white rounded shadow-sm h-full sticky top-4', className)}>
      <div className="p-8">
        <Title text="Валюта" className="mb-4 uppercase font-medium" />
        <Tabs defaultValue="rub">
          <TabsList>
            <TabsTrigger value="rub" onClick={() => changeCurrency("rub")}>rub</TabsTrigger>
            <TabsTrigger value="usd" onClick={() => changeCurrency("usd")}>usd</TabsTrigger>
            <TabsTrigger value="eur" onClick={() => changeCurrency("eur")}>eur</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="pb-8">
        <Title text="Количество пересадок" className="mb-4 uppercase px-8 font-medium" />
        {['all', 'noTransfer', 'oneTransfer', 'twoTransfers', 'threeTransfers'].map((transfer) =>
          renderCheckbox(
            transfer === 'all'
              ? 'Все'
              : transfer === 'noTransfer'
                ? 'Без пересадки'
                : transfer === 'oneTransfer'
                  ? '1 пересадка'
                  : transfer === 'twoTransfers'
                    ? '2 пересадки'
                    : '3 пересадки',
            transfer as keyof typeof transfers
          )
        )}
      </div>
    </div>
  );
};

export default Filters