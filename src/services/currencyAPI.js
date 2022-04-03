const getCurrency = async () => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiResult = await result.json();

  return apiResult;
};

export default getCurrency;
