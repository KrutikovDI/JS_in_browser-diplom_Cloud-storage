/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element
    this.input = this.element.getElementsByTagName("input");
    this.replace = this.element.querySelector('.replace');
    this.add = this.element.querySelector('.add');
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.replace.addEventListener('click', (event) => {
      if (this.input[0].value.trim() != '') {
        VK.get(this.input.value, (result) => {
          App.imageViewer.clear();
          App.imageViewer.drawImages(result)
        })
      }
    })
    this.add.addEventListener('click', (event) => {
      if (this.input[0].value.trim() != '') {
        VK.get(this.input.value, (result) => {
          App.imageViewer.drawImages(result)
        })
      }
    })
  }
}

