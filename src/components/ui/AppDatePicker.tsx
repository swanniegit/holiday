"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AppDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  placeholder?: string;
  required?: boolean;
}

export default function AppDatePicker({ value, onChange, minDate, placeholder = "DD Mon YY", required }: AppDatePickerProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd MMM yy"
      minDate={minDate}
      placeholderText={placeholder}
      required={required}
      autoComplete="off"
      className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
      calendarClassName="!font-sans !text-sm !border-cream-dark !rounded-sm !shadow-lg"
      wrapperClassName="w-full"
    />
  );
}
