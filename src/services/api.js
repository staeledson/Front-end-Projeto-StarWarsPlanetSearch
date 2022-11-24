import testDataMock from './testDataMock';

// const requestAPI = async () => {
//   try {
//     const URL = 'https://swapi.dev/api/planets';
//     const response = await fetch(URL);
//     const { results } = await response.json();
//     results.forEach((result) => {
//       delete result.residents;
//     });
//     return results;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const requestAPI = async () => {
  try {
    const resultsMock = [...testDataMock.results];
    resultsMock.forEach((result) => {
      delete result.residents;
    });
    return resultsMock;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default requestAPI;
