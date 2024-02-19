/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
      this.element = element;
      this.imagePreview = document.getElementsByClassName('ui fluid image')[0];
      this.imageBlock = document.getElementsByClassName('column ten wide images-list')[0];
      this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imageBlock.addEventListener('dblclick', (event) => {
          if (event.target.tagName == "IMG") {
              this.imagePreview.src = event.target.src;
          }
      })
      this.imageBlock.addEventListener('click', (event) => {
          if (event.target.tagName == "IMG") {
              event.target.classList.toggle('selected');
          }
          let imageList = imageBlock.getElementsByTagName('IMG');
          if (event.target.tagName == "BUTTON") {
              if (event.target.checkButtonText == "Выбрать всё") {
                  let count = 0;
                  for (let i = 0; i < imageList.length; i++) {
                      if (imageList[i].classList.contains('selected')) {
                          count ++;
                      }
                  }
                  if (count == 0) {
                      for (let i = 0; i < imageList.length; i++){
                          imageList[i].classList.add('selected');
                      }
                  }
                  else {
                      for (let i = 0; i < imageList.length; i++){
                          imageList[i].classList.remove('selected');
                      }
                  }
              }
              if (event.target.checkButtonText == "Посмотреть загруженные файлы") {
                  const modalWindow = new App.getModal(this.element);
                  let modalWindowContent = document.createElement('i');
                  modalWindowContent.className = 'asterisk loading icon massive';
                  modalWindow.addendChild(modalWindowContent);
                  BaseModal.open();
                  Yandex.getUploadedFiles(() => {
                      FileUploaderModal.showImages(this.imageList);
                  })
              }
              if (event.target.checkButtonText == "Отправить на диск") {
                  const modalWindow = new App.getModal(this.element);
                  let imageListSelect = [];
                  for (let i = 0; i < imageList.length; i++) {
                      if (imageList[i].classList.contains('selected')) {
                          imageListSelect.push(imageList[i]);
                      }
                  }
                  BaseModal.open();
                  FileUploaderModal.showImages(this.imageListSelect);
              }
          }
      })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
      this.imagePreview.src = 'https://yugcleaning.ru/wp-content/themes/consultix/images/no-image-found-360x250.png';
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
      this.ButtonSelectOll = document.querySelector('.select-all')
      if (this.ButtonSelectOll.length > 0) {
        this.ButtonSelectOll.classList.remove('disabled');
      }
      else {
          ButtonSelectOll.classList.add('disabled');
      }
      for (let i = 0; i < images.length; i++) {
          let image = document.createElement('img');
          image.src = images[i].url;
          image.classList.add('four wide column ui medium image-wrapper');
          imageBlock.appendChild(image);
      }
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
      this.imageList = imageBlock.getElementsByTagName('IMG');
      const ButtonSelectOll = document.querySelector('.select-all')
      const ButtonSend = document.querySelector('.send')
      let count = 0;
      for (let i = 0; i < imageList.length; i++) {
          if (this.imageList[i].classList.contains('selected')) {
              count ++;
          }        
      }
      if (this.imageList.length == count) {
          ButtonSelectOll.textContent = "Снять выделение";
      }
      else {
          ButtonSelectOll.textContent = "Выделить всё";
      }
      if (count != 0) {
          ButtonSend.classList.remove('disabled');
      }
      else {
          ButtonSend.classList.add('disabled');
      }
  }

}
