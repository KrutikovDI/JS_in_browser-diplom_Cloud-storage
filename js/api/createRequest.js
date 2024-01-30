/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {
  method: 'GET',
  url: 'https://example.com',
  headers: {
      Authorization: 'Authorization',
      OAuth: 'OAuth токен_доступа'
      },
  data: {
      mail: "k@yandex.ru",
      password: 'odinoid',
      },
  callBack: (err, response) => {
      console.log(response);
      console.log(err);
      }
}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  try {
      xhr.open(options.method, options.url+'?'+options.data.mail+'&'+options.data.password);
      xhr.setRequestHeader(Authorization, OAuth);
      xhr.sent(data);
  } catch (err) {
      console.log(`Ошибка в запросе createRequest ${err}`);
  }
};
