
/* Компонент: self-rotation-with-axis */
AFRAME.registerComponent('self-rotation-with-axis', {
  // Додавання нової властивості 'axis' типу vec3 [cite: 2]
  schema: {
    speed: { type: 'number', default: 1.0 },
    axis: { type: 'vec3', default: { x: 0, y: 1, z: 0 } } // Вісь обертання за замовчуванням (Y-вісь) [cite: 2]
  },

  // Ініціалізація, тут можна отримати об'єкт three.js
  init: function () {
    this.rotationVector = new THREE.Vector3(); // Вектор для обертання
    this.tempQuat = new THREE.Quaternion(); // Тимчасовий кватерніон для обчислень
  },

  // Метод tick для постійного обертання
  tick: function (time, timeDelta) {
    const el = this.el;
    const data = this.data;
    const speed = data.speed;
    const axis = data.axis;

    // Встановлення вектора осі обертання [cite: 3]
    this.rotationVector.set(axis.x, axis.y, axis.z).normalize();

    // Обчислення кута обертання [cite: 3]
    // Використовуємо timeDelta (час, що пройшов з останнього кадру) для плавного обертання,
    // незалежного від частоти кадрів.
    const angle = speed * (timeDelta / 1000) * (Math.PI / 180); // Кут в радіанах

    // Створення кватерніона обертання навколо заданої осі [cite: 3]
    this.tempQuat.setFromAxisAngle(this.rotationVector, angle);

    // Застосування обертання до об'єкта [cite: 4]
    // Використовуємо .object3D для доступу до об'єкта three.js [cite: 4]
    el.object3D.quaternion.multiply(this.tempQuat);
  }
});

/* Компонент: toggle-visibility-on-click */
AFRAME.registerComponent('toggle-visibility-on-click', {
  // Ініціалізація
  init: function () {
    const el = this.el;
    // Змінна для зберігання поточного стану видимості (true - видимий, false - невидимий) [cite: 7]
    this.isVisible = true; 

    // Додавання слухача події 'click' [cite: 6]
    this.onClick = this.onClick.bind(this); // Прив'язка контексту
    el.addEventListener('click', this.onClick);
  },

  // Метод, що викликається при кліку
  onClick: function () {
    const el = this.el;

    // Перевірка та зміна стану [cite: 7]
    if (this.isVisible) {
      // Якщо видимий -> робимо невидимим 
      el.setAttribute('visible', false); 
      this.isVisible = false;
    } else {
      // Якщо невидимий -> робимо видимим 
      el.setAttribute('visible', true);
      this.isVisible = true;
    }
  },

  // Зняття слухача при видаленні компонента (запобігання витокам пам'яті)
  remove: function () {
    this.el.removeEventListener('click', this.onClick);
  }
});
/* Компонент: look-at-camera */
AFRAME.registerComponent('look-at-camera', {
  // Ініціалізація
  init: function () {
    // Отримання елемента камери. У A-Frame це часто елемент з атрибутом 'camera' [cite: 9]
    this.cameraEl = document.querySelector('[camera]');
    if (!this.cameraEl) {
      console.error('Камеру не знайдено!');
      return;
    }
    // Створення вектора для зберігання світової позиції камери
    this.cameraWorldPosition = new THREE.Vector3(); 
  },

  // Метод tick для постійного оновлення обертання [cite: 9]
  tick: function () {
    const el = this.el;
    
    // Перевірка, чи існують елементи
    if (!this.cameraEl || !el.object3D) {
      return;
    }

    // 1. Отримання світової позиції камери [cite: 9]
    // Метод getWorldPosition() є частиною three.js (Object3D)
    this.cameraEl.object3D.getWorldPosition(this.cameraWorldPosition);

    // 2. Використання методу lookAt() з бібліотеки three.js [cite: 9]
    // lookAt() повертаєєкт так, щоб його вісь Z була спрямована на вказану точку.
    // three.js лежить в основі A-Frame, тому ми використовуємо this.el.object3D [cite: 9]
    el.object3D.lookAt(this.cameraWorldPosition);
  }
});