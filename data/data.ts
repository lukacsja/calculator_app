import divide from '@/public/icons/divide.svg';
import equals from '@/public/icons/equals.svg';
import minus from '@/public/icons/minus.svg';
import multiply from '@/public/icons/multiply.svg';
import plus from '@/public/icons/plus.svg';
import percent from '@/public/icons/percent.svg';
import plus_minus from '@/public/icons/plus_minus.svg';

export const buttonsData = [
  { key: 'Delete', label: 'CE', type: 'action', style: 'text-color' },
  { key: 'Backspace', label: 'C', type: 'action', style: 'default' },
  { key: '%', label: '%', type: 'operator', style: 'default', icon: percent },
  { key: '/', label: '/', type: 'operator', style: 'colored', icon: divide },
  { key: '7', label: '7', type: 'value', style: 'default' },
  { key: '8', label: '8', type: 'value', style: 'default' },
  { key: '9', label: '9', type: 'value', style: 'default' },
  { key: '*', label: '*', type: 'operator', style: 'colored', icon: multiply },
  { key: '4', label: '4', type: 'value', style: 'default' },
  { key: '5', label: '5', type: 'value', style: 'default' },
  { key: '6', label: '6', type: 'value', style: 'default' },
  { key: '-', label: '-', type: 'operator', style: 'colored', icon: minus },
  { key: '1', label: '1', type: 'value', style: 'default' },
  { key: '2', label: '2', type: 'value', style: 'default' },
  { key: '3', label: '3', type: 'value', style: 'default' },
  { key: '+', label: '+', type: 'operator', style: 'colored', icon: plus },
  { key: '', label: '+/-', type: 'action', style: 'default', icon: plus_minus },
  { key: '0', label: '0', type: 'value', style: 'default' },
  { key: ',', label: '.', type: 'value', style: 'default' },
  {
    key: 'Enter',
    label: '=',
    type: 'action',
    style: 'colored-light',
    icon: equals,
  },
];

export const formatLargeValue = (value: number) => {
  const stringValue = value.toString();

  const hasDecimalPoint = stringValue.includes('.');

  const parts = hasDecimalPoint ? stringValue.split('.') : [stringValue];

  const exponent = Math.floor(Math.log10(Math.abs(parseFloat(parts[0]))));

  const mantissa = parseFloat(parts[0]) / Math.pow(10, exponent);

  const formattedValue = `${mantissa.toFixed(2)}e${exponent}`;

  return hasDecimalPoint ? `${formattedValue}.${parts[1]}` : formattedValue;
};
