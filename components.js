AFRAME.registerComponent('self-rotation', {
    // 'schema' визначає властивості, які можна налаштовувати з HTML
    schema: {
      speed: {type: 'number', default: 1}, // Швидкість обертання
      axis: {type: 'vec3', default: { x: 0, y: 1, z: 0 }}
    },
  
    // 'init' - функція, що викликається один раз при ініціалізації компонента
    init: function () {
      console.log('Компонент self-rotation ініціалізовано!');
      // 'this.el' - це HTML-елемент (сутність), до якого прикріплений компонент
      // 'this.data' - це об'єкт з властивостями з 'schema' (наприклад, this.data.speed)
    },
  
    // 'tick' - функція, що викликається на кожному кадрі анімації
    // 'time' - загальний час сцени, 'timeDelta' - час з попереднього кадру
    tick: function (time, timeDelta) {
      // Отримуємо поточне обертання об'єкта
      var currentRotation = this.el.getAttribute('rotation');
  
      // Розраховуємо нове обертання для осі Y
      var newRotationY = currentRotation.y + this.data.speed * (timeDelta / 1000) * 360;
  
      // Встановлюємо нове значення обертання
      this.el.setAttribute('rotation', {
        x: rotation.x += this.data.axis.x * deltaRotation,
        y: rotation.y += this.data.axis.x * deltaRotation,
        z: rotation.z += this.data.axis.x * deltaRotation,
      });
    }
  });
  