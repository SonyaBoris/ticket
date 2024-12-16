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
}

export const Filters: React.FC<React.PropsWithChildren<Props>> = ({ className }) => {

  const { control, watch } = useForm({
    defaultValues: {
      transfers: {
        all: true,
        noTransfer: false,
        oneTransfer: false,
        twoTransfers: false,
        threeTransfers: false,
      },
    },
  });

  const dispatch = useAppDispatch();
  const transfers = watch('transfers');

  const handleCheckboxChange = (name: any) => {

    if (name === 'all' && transfers.all) {
      dispatch(fetchTickets({ transfer: [] }));
    } else {
      const selectedTransfers = [];
      if (transfers.noTransfer) selectedTransfers.push(0);
      if (transfers.oneTransfer) selectedTransfers.push(1);
      if (transfers.twoTransfers) selectedTransfers.push(2);
      if (transfers.threeTransfers) selectedTransfers.push(3);

      dispatch(fetchTickets({ transfer: selectedTransfers }));
    }
  };

  return <div className={cn('bg-white rounded shadow-sm h-full', className)}>
    <div className='p-8'>
      <Title text="Валюта" className="mb-4 uppercase font-medium" />
      <Tabs defaultValue="rub">
        <TabsList>
          <TabsTrigger value="rub">rub</TabsTrigger>
          <TabsTrigger value="usd">usd</TabsTrigger>
          <TabsTrigger value="eur">eur</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <div className='pb-8'>
      <Title text="Количество пересадок" className="mb-4 uppercase px-8 font-medium" />
      <Controller
        name="transfers.all"
        control={control}
        render={({ field }) => (
          <FilterCheckbox
            text="Все"
            value="all"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              handleCheckboxChange('all');
            }}
          />
        )}
      />
      <Controller
        name="transfers.noTransfer"
        control={control}
        render={({ field }) => (
          <FilterCheckbox
            text="Без пересадки"
            value="noTransfer"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              handleCheckboxChange('noTransfer');
            }}
          />
        )}
      />
      <Controller
        name="transfers.oneTransfer"
        control={control}
        render={({ field }) => (
          <FilterCheckbox
            text="1 пересадка"
            value="oneTransfer"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              handleCheckboxChange('oneTransfer');
            }}
          />
        )}
      />
      <Controller
        name="transfers.twoTransfers"
        control={control}
        render={({ field }) => (
          <FilterCheckbox
            text="2 пересадки"
            value="twoTransfers"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              handleCheckboxChange('twoTransfers');
            }}
          />
        )}
      />
      <Controller
        name="transfers.threeTransfers"
        control={control}
        render={({ field }) => (
          <FilterCheckbox
            text="3 пересадки"
            value="threeTransfers"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              handleCheckboxChange('threeTransfers');
            }}
          />
        )}
      />
    </div>
  </div>;
};