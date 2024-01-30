/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element
    this.searchBlock = document.querySelector('.search-block');
    this.input = document.getElementsByTagName('input');
    this.replace = document.querySelector('.replace');
    this.add = document.querySelector('.add');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.searchBlock.addEventListener('click', (event) => {
      if (this.input.value.trim() != undefined) {
        this.photoList = VK.get(this.input.value, App.imageViewer.drawImages)
        if (event.target == this.replace) {
        }
        else if (event.target == this.add) {}
      }
    })
  }

}

