/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
      if (window.localStorage.getItem('OuthToken') != null) {
          return window.localStorage.getItem('OuthToken');
      }
      else {
            let promptOuth = prompt('Введите токен авторизации в Yandex: ');
            window.localStorage.setItem('OuthToken', promptOuth);
            return window.localStorage.getItem('OuthToken');
      }
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
      let token = this.getToken();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', this.HOST + '/upload?path=' + path + '&url=' + url);
      xhr.setRequestHeader('Authorization', 'OAuth ' + token);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = () => {
          if (xhr.status === 201) {
              callback(null, xhr.response);
          } else {
              callback(xhr.statusText, null);
          }
      };
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
      let token = this.getToken();
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', this.HOST + '/delete?path=' + path);
      xhr.setRequestHeader('Authorization', 'OAuth ' + token);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = () => {
          if (xhr.status === 204) {
              callback(null, xhr.response);
          } else {
              callback(xhr.statusText, null);
          }
      };
  }


  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
      let token = this.getToken();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.HOST + '/resources/files');
      xhr.setRequestHeader('Authorization', 'OAuth ' + token);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = () => {
          if (xhr.status === 200) {
              callback(null, xhr.response);
          } else {
              callback(xhr.statusText, null);
          }
      };
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
      let token = this.getToken();
      let xhr = new XMLHttpRequest();
      xhr.open('GET', this.HOST + '/download?url=' + url);
      xhr.setRequestHeader('Authorization', 'OAuth ' + token);
      xhr.responseType = 'blob';
      xhr.send();
      xhr.onload = () => {
          if (xhr.status === 200) {
              let blob = xhr.response;
              let a = document.createElement('a');
              a.href = window.URL.createObjectURL(blob);
              a.download = 'file.txt';
              a.click();
          }
      }
  }
}
