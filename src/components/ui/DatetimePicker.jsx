import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import Input from "./Input";
import { Calendar } from "lucide-react";

const DatetimePicker = ({ placeholder, value, onChange }) => {
  return (
    <Popover className="flex-center m-5">
      <PopoverTrigger className="w-full">
        <Input
          value={value}
          readOnly
          placeholder={placeholder || "Select Date & Time"}
          icon={<Calendar />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Datetime
          input={false}
          onChange={onChange}
          className="custom-datetime"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatetimePicker;
