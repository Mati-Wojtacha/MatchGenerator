export function blockNegativeNumbersAndText(event) {
  let value = event.target.value;

  value = value.replace(/[^0-9]/g, '');

  if (value === '') {
    value = '0';
  }

  event.target.value = value;
}