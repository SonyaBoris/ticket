import React from 'react';
import { Checkbox } from '../ui';


export interface FilterChecboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className="flex items-center space-x-2 py-2 group hover:bg-blue-100 pr-8">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded w-6 h-6 ml-8"
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      <button className='uppercase opacity-0 group-hover:opacity-100 text-primary font-medium text-[14px]'>Только</button>
      {endAdornment}
    </div>
  );
};