/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
      super(element);
      this.crossModalWindow = document.querySelector('.!!!!!!!cross-modal-window!!!!!!!!'); //д.б. крестик модального окна
      this.close = document.querySelector('.close');
      this.sendAllFiles = document.querySelector('.send-all');
      this.content = document.querySelector('.content');
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.crossModalWindow.addEventListener('click', this.close.bind(this));
    this.close.addEventListener('click', this.close.bind(this));
    this.sendAllFiles.addEventListener('click', this.sendAllImages.bind(this));
    
      this.content.addEventListener('click', (event) => {
        if (event.target.classList.contains('input')) {
          event.target.classList.remove('error');
        }
        if (event.target.classList.contains('send-all')){
          this.sendImage(imageContainer);
        }
      });
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    images.reverse();
    this.imagesHTML = [];
    for (let i = 0; i < images.length; i++) {
      this.imagesHTML.push(getImageHTML(images[i]));
    }
    this.imagesHTMLString = imagesHTML.join('');
    this.content.innerHTML = this.imagesHTMLString;
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container"><img src="${item.url}"/><div class="ui action input"><input type="text" placeholder="Путь к файлу"><button class="ui button"><i class="upload icon"></i></button></div></div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    this.imageList = this.content.getElementsByClassName('image-preview-container');
    for (let i = 0; i < this.imageList.length; i++) {
      this.sendImages(imageList[i]);
    }
    
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    this.pathUploadImage = imageContainer.querySelector('input').value
    if (this.pathUploadImage == null) {
      imageContainer.querySelector('.input').classList.add('error');
    } else {
      imageContainer.querySelector('.input').classList.add('disabled');
      this.srcImage = imageContainer.querySelector('img').src;
      Yandex.uploadFile(this.pathUploadImage, this.srcImage, () => {
        this.content.removeChild(imageContainer);
        this.imageList = this.content.getElementsByClassName('image-preview-container');
        if (this.imageList.length == 0) {
          this.close.bind(this)}
      });
    }
  }
}

/*
<div class="image-preview-container">
  <img src='https://yugcleaning.ru/wp-content/themes/consultix/images/no-image-found-360x250.png' />
  <div class="ui action input">
    <input type="text" placeholder="Путь к файлу">
    <button class="ui button"><i class="upload icon"></i></button>
  </div>
</div>
*/