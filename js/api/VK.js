/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  // static ACCESS_TOKEN = '32008';
  static ACCESS_TOKEN = 'vk1.a.lxUDUk089kwXRLgyIhlapw3tRvnc2YW3Iwa0Q7BVEF2qEWfOXmd5LgTNOHWQlYGxbAVnmgh3gdw0bsEVMdMZx49J68lsjwDRPA7aA9ivbFAJIMwQtwnjKLSs4TPdGEOqNRLlB-24L9IkUoT7KS8fFHt4UG82dMv0dKj4InQspsiHu5w3_US2sF35Hncet09pdo3ckaBRwxZiDhC32aDmrA';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    let script = document.createElement('script');
    script.id = "createElement"
    script.src = `https://api.vk.com/method/users.get?user_ids=${id}&fields=bdate&v=5.199&album_id=profile&callback=${(result) => {VK.processData(result)}}`;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    const tagHead = document.getElementsByTagName("head")
    let createElement = tagHead.getElementById("createElement")
    createElement.remove();
    try {
      let photo_list = []
      for (let i = 0; i < result.response.items.length; i++) {
        let num = result.response.items[i].sizes.length
        photo_list.push(result.response.items[i].sizes[num-1].url)
      }
      this.callback(photo_list)
      this.lastCallback = () => {}
    }
    catch (error) {
      alert(result.error_msg)
    }
  }
}