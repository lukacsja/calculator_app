'use client';

import React, { useEffect, useState } from 'react';
import { buttonsData, formatLargeValue } from '@/data/data';
import { ButtonType } from '@/types/button';
import Image from 'next/image';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [storedValue, setStoredValue] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);

  const handlePlusMinusSign = () => {
    if (+currentValue > 0) {
      setCurrentValue((prevValue) => (+prevValue * -1).toString());
    } else {
      setCurrentValue((prevValue) => prevValue.slice(1));
    }
  };

  const resetCalculator = () => {
    setOperator(null);
    setStoredValue('');
    setCurrentValue('');
  };

  const resetCurrentValue = () => {
    setCurrentValue('');
  };

  const calculateResult = (
    part1: number,
    operator: string,
    part2: number
  ): number => {
    switch (operator) {
      case '+':
        return part1 + part2;
      case '-':
        return part1 - part2;
      case '*':
        return part1 * part2;
      case '/':
        return part2 !== 0 ? part1 / part2 : part1;
      case '%':
        return (part1 / 100) * part2;
      default:
        return part1;
    }
  };

  const handleOperatorClick = (button: ButtonType) => {
    if (!storedValue && !currentValue) {
      setStoredValue('0');
    }

    if (!storedValue && currentValue) {
      setStoredValue(currentValue);
    }

    if (storedValue && currentValue) {
      setOperator(button.label);

      const result = calculateResult(
        parseFloat(storedValue),
        operator as string,
        parseFloat(currentValue)
      );

      setCurrentValue(result.toString());
      setStoredValue(result.toString());
    }

    setCurrentValue('');
    setOperator(button.label);
  };

  const handleValueClick = (button: ButtonType) => {
    if (currentValue.length <= 10) {
      if (button.label === '.' && currentValue.includes('.')) {
        return null;
      }

      if (currentValue === '' && button.label === '.') {
        setCurrentValue('0');
      }

      if (
        (currentValue === '' && button.label !== '.') ||
        currentValue === '0'
      ) {
        setCurrentValue(button.label);
      } else {
        setCurrentValue((prevState) => prevState + button.label);
      }
    } else {
      return null;
    }
  };

  const handleEqualsClick = () => {
    if (storedValue !== '' && operator && currentValue !== '') {
      const result = calculateResult(
        parseFloat(storedValue),
        operator,
        parseFloat(currentValue)
      );

      const hasDecimal = result.toString().includes('.');

      if (hasDecimal && result.toString().length > 11) {
        const parts = result.toString().split('.');
        const shortResult = result.toFixed(11 - parts[0].length);

        setCurrentValue(shortResult.toString());

        console.log('ROUNDED');
      } else {
        setCurrentValue(result.toString());
      }
      setStoredValue('');
      setOperator(null);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const button = buttonsData.find((btn) => btn.key === event.key);
      if (button) {
        if (button.type === 'value') {
          handleValueClick(button);
        } else if (button.type === 'operator') {
          handleOperatorClick(button);
        } else if (button.label === '=') {
          handleEqualsClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentValue]);

  useEffect(() => {
    const threshold = 1e11;
    const numericValue = parseFloat(currentValue);

    if (Math.abs(numericValue) >= threshold) {
      const formattedValue = formatLargeValue(numericValue);
      setCurrentValue(formattedValue);
    }
  }, [currentValue]);

  const applyButtonStyles = (button: ButtonType) => {
    switch (button.style) {
      case 'colored':
        return 'bg-purple-dark';
      case 'colored-light':
        return 'bg-purple-medium';
      case 'text-color':
        return 'text-purple-medium';
      default:
        return 'text-text-white';
    }
  };

  return (
    <div className='main-shadow main-shadow::before main-shadow::after flex h-[544px] w-[356px] flex-col items-center gap-[26px] rounded-[48px] bg-gray-dark px-[20px] py-[32px]'>
      <div className='flex h-[86px] w-[288px] flex-col items-end gap-2 pl-[22px] pr-[18px] text-[20px] leading-[1.4]'>
        <div className='flex-1 text-gray-medium'>
          {`${storedValue} ${operator === null ? '' : operator}`}
        </div>

        <div className='flex-1 overflow-hidden text-[36px] leading-[1.4] text-text-white'>
          {currentValue}
        </div>
      </div>

      <div className='grid h-[368px] w-[292px] select-none grid-cols-4 gap-3'>
        {buttonsData.map((button) => (
          <button
            key={button.label}
            className={`${applyButtonStyles(
              button
            )} key-shadow flex h-[64px] w-[64px] items-center justify-center rounded-full text-[24px]`}
            onClick={() => {
              if (button.type === 'value') {
                handleValueClick(button);
              } else if (button.type === 'operator') {
                handleOperatorClick(button);
              } else if (button.label === '=') {
                handleEqualsClick();
              } else if (button.label === 'CE') {
                resetCurrentValue();
              } else if (button.label === '+/-') {
                handlePlusMinusSign();
              } else {
                resetCalculator();
              }
            }}
          >
            {button.icon ? (
              <Image src={button.icon} alt={button.label} />
            ) : (
              button.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
