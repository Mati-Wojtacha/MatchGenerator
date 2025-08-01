export function blockNegativeNumbersAndText(event) {
  let value = event.target.value;

  value = value.replace(/[^0-9]/g, '');

  event.target.value = value;
}