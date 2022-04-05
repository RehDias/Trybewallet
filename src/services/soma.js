const handleSum = (expenses) => {
  let sum = 0;

  expenses.forEach((expense) => {
    sum = Number(expense.value) * expense.exchangeRates[expense.currency].ask + sum;
  });

  return sum.toFixed(2);
};

export default handleSum;
