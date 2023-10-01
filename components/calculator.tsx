"use client";

import React, { useEffect, useState } from "react";
import { buttonsData, formatLargeValue } from "@/data/data";
import { ButtonType } from "@/types/button";
import Image from "next/image";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [storedValue, setStoredValue] = useState<string>("");
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
    setStoredValue("");
    setCurrentValue("");
  };

  const resetCurrentValue = () => {
    setCurrentValue("");
  };

  const calculateResult = (
    part1: number,
    operator: string,
    part2: number
  ): number => {
    switch (operator) {
      case "+":
        return part1 + part2;
      case "-":
        return part1 - part2;
      case "*":
        return part1 * part2;
      case "/":
        return part2 !== 0 ? part1 / part2 : part1;
      case "%":
        return (part1 / 100) * part2;
      default:
        return part1;
    }
  };

  const handleOperatorClick = (button: ButtonType) => {
    if (!storedValue && !currentValue) {
      setStoredValue("0");
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

    setCurrentValue("");
    setOperator(button.label);
  };

  const handleValueClick = (button: ButtonType) => {
    if (button.label === "." && currentValue.includes(".")) {
      return null;
    }

    if (currentValue === "" && button.label === ".") {
      setCurrentValue("0");
    }

    if ((currentValue === "" && button.label !== ".") || currentValue === "0") {
      setCurrentValue(button.label);
    } else {
      setCurrentValue((prevState) => prevState + button.label);
    }
  };

  const handleEqualsClick = () => {
    if (storedValue !== "" && operator && currentValue !== "") {
      const result = calculateResult(
        parseFloat(storedValue),
        operator,
        parseFloat(currentValue)
      );
      setCurrentValue(result.toString());
      setStoredValue("");
      setOperator(null);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const button = buttonsData.find((btn) => btn.key === event.key);
      if (button) {
        if (button.type === "value") {
          handleValueClick(button);
        } else if (button.type === "operator") {
          handleOperatorClick(button);
        } else if (button.label === "=") {
          handleEqualsClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentValue]);

  useEffect(() => {
    const threshold = 1e10;
    const numericValue = parseFloat(currentValue);

    if (Math.abs(numericValue) >= threshold) {
      const formattedValue = formatLargeValue(numericValue);
      setCurrentValue(formattedValue);
    }
  }, [currentValue]);

  const applyButtonStyles = (button: ButtonType) => {
    switch (button.style) {
      case "colored":
        return "bg-[#462878]";
      case "colored-light":
        return "bg-[#975DFA]";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-[48px] flex flex-col gap-[26px] px-[20px] py-[32px] items-center w-[356px] h-[544px] bg-[#2D2A37] main-shadow main-shadow::before main-shadow::after">
      <div className="flex flex-col items-end text-[20px] pl-[22px] pr-[18px] gap-2 leading-[1.4] w-[288px] h-[86px]">
        <div className="text-gray flex-1">
          {`${storedValue} ${operator === null ? "" : operator}`}
        </div>

        <div className="text-[36px] leading-[1.4] text-white flex-1">
          {currentValue}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-[292px] h-[368px] select-none">
        {buttonsData.map((button) => (
          <button
            key={button.label}
            className={`${applyButtonStyles(
              button
            )} flex justify-center items-center w-[64px] h-[64px] text-[24px] rounded-full color-white key-shadow`}
            onClick={() => {
              if (button.type === "value") {
                handleValueClick(button);
              } else if (button.type === "operator") {
                handleOperatorClick(button);
              } else if (button.label === "=") {
                handleEqualsClick();
              } else if (button.label === "CE") {
                resetCurrentValue();
              } else if (button.label === "+/-") {
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
