
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  className,
  required,
  id,
  name,
}) => {
  // Format the phone number as user types
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-digits
    const digitsOnly = input.replace(/\D/g, '');
    
    // Handle special case for +7
    if (input.startsWith('+') && digitsOnly.startsWith('7')) {
      // Format as +7 (XXX) XXX-XX-XX
      const countryCode = digitsOnly.substring(0, 1);
      const areaCode = digitsOnly.substring(1, 4);
      const firstPart = digitsOnly.substring(4, 7);
      const secondPart = digitsOnly.substring(7, 9);
      const thirdPart = digitsOnly.substring(9, 11);
      
      let formatted = `+${countryCode}`;
      
      if (areaCode) {
        formatted += ` (${areaCode}`;
        if (areaCode.length === 3) formatted += ')';
      }
      
      if (firstPart) {
        formatted += ' ' + firstPart;
      }
      
      if (secondPart) {
        formatted += '-' + secondPart;
      }
      
      if (thirdPart) {
        formatted += '-' + thirdPart;
      }
      
      return formatted;
    }
    
    // If not starting with +7, just return the input
    return input;
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // If input is empty or just "+", don't format
    if (!inputValue || inputValue === '+') {
      onChange(inputValue);
      return;
    }
    
    // If first character isn't '+', add it automatically
    let valueToFormat = inputValue;
    if (!inputValue.startsWith('+')) {
      valueToFormat = '+' + inputValue;
    }
    
    const formattedValue = formatPhoneNumber(valueToFormat);
    onChange(formattedValue);
  };
  
  return (
    <Input
      id={id}
      name={name}
      type="tel"
      value={value}
      onChange={handleChange}
      className={className}
      placeholder="+7 (999) 123-45-67"
      required={required}
    />
  );
};

export default PhoneInput;
