import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
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
    </div>
  );
};

export default SearchFilter;
