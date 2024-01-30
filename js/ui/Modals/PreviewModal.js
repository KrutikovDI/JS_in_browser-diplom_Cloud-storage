/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element)
    this.crossModalWindow = document.querySelector('.!!!!!!!cross-modal-window!!!!!!!!'); //д.б. крестик модального окна
    this.close = document.querySelector('.close');
    this.content = document.querySelector('.content');
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.crossModalWindow.addEventListener('click', this.close.bind(this));
    this.close.addEventListener('click', this.close.bind(this));
    this.content.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete')) {
        event.target.querySelector('i').classList.add('icon spinner loading');
        /*Заблокировать кнопку удаления, добавив класс disabled - где эта кнопкa??????????*/
        Yandex.removeFile(path, () => {
          if (xhr.status === 204) {
            this.content.removeChild(imageContainer);
          }
        })
      }
      if (event.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(url)
      }
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(imagesList) {
    imagesList.reverse();
    this.imagesHTML - [];
    for (let i = 0; i < imagesList.length; i++) {
      this.imagesHTML.push(FileUploaderModal.getImageHTML(imagesList[i]));
    }
    this.imagesHTMLString = this.imagesHTML.join('');
    this.content.innerHTML = this.imagesHTMLString;
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Moscow'
    };
    return date.toLocaleString('ru-RU');
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container"><img src="${item.src}" /><table class="ui celled table"><thead><tr><th>Имя</th><th>Создано</th><th>Размер</th></tr></thead><tbody><tr><td>${item.name}</td><td>${this.formatDate(item.date)}</td><td>${item.file}Кб</td></tr></tbody></table><div class="buttons-wrapper"><button class="ui labeled icon red basic button delete" data-path="${item.url}">Удалить<i class="trash icon"></i></button><button class="ui labeled icon violet basic button download" data-file="${item.url}">Скачать<i class="download icon"></i></button></div></div>`
  }
}

/*
<div class="image-preview-container">
  <img src='XXX' />
  <table class="ui celled table">
  <thead>
    <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
  </thead>
  <tbody>
    <tr><td>AAA</td><td>BBB</td><td>CCCКб</td></tr>
  </tbody>
  </table>
  <div class="buttons-wrapper">
    <button class="ui labeled icon red basic button delete" data-path='PPP'>
      Удалить
      <i class="trash icon"></i>
    </button>
    <button class="ui labeled icon violet basic button download" data-file='FFF'>
      Скачать
      <i class="download icon"></i>
    </button>
  </div>
</div>
*/