import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { ORDER_TRACKING_STATUS } from '../../types/global';
import DateRangePicker from '@/components/DateRangePicker';
import { DateRange } from 'react-day-picker';


interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}


const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  return (
    <div className='flex gap-4 items-center w-full'>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        type='search'
        placeholder='Search'
      />

      <DateRangePicker range={dateRange} onSelect={setDateRange}  />
      {/* <Select
        onValueChange={(value) => {
          setFilter(value);
        }}
        defaultValue={filter}
      >
        <SelectTrigger className='max-w-xl'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          {ORDER_TRACKING_STATUS.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
              className='flex items-center gap-2 text-ellipsis'
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default SearchFilter;
