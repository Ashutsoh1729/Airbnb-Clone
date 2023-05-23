'use client'


import React from 'react'
import {  Range } from 'react-date-range';
import Calendar from '../input/Calender';
import Button from '../Button';


interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    disabled: boolean;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disableDates: Date[];

}










const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    disableDates,
    disabled,
    onChangeDate,
    onSubmit
}) => {
  return (
      <div className='bg-white mt-1 rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
          <div className='flex flex-row items-center gap-1 p-4'>
              <div className='text-2xl font-semibold'>
                  $ {price}
              </div>
              <div className=' font-light text-neutral-600'>
                  night
              </div>
          </div>
          <Calendar
              value={dateRange}
              disabledDates={disableDates}
              onChange={(value: any) => onChangeDate(value.selection)}
              
          />
          <hr />
          <div className='p-4'>
              <Button
                  disabled={disabled}
                  label='Reserve'
                  onClick={onSubmit}
                  labelClassName = "text-xl"
              />
          </div>
          <div className='flex flex-row items-center gap-1 p-4 mt-4 justify-between'>
              <div className='text-2xl font-semibold'>
                  Total: 
              </div>
              <div className='text-2xl font-semibold'>
                  $ {totalPrice}
              </div>
          </div>



    </div>
  )
}

export default ListingReservation

























