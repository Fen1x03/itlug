/**
 * @class App
 * @description Основной класс приложения, управляющий функциональностью бургер-меню и прокруткой
 */
class App {
  #apiUrl = 'https://idevlogic.ru/hackathon/test.php';

  #statsEl = null
  #animateStataParams = {
    duration: 2000,
    threshold: 0.1,
    root: null,
    rootMargin: '0px'
  }

  //FIX - инициализация значения
  #sections = null
  #menuLinks = null
  #scrollToLinks = null
  #highlightActiveMenuParams = {
    activeClass: 'active',
    root: null,
    rootMargin: '-100px 0px -100px 0px',
    //FIX замена threshold: 0.4->0.1
    threshold: 0.1
  }

  #modalOpenLinks = null
  #modalCloseLinks = null
  #modalBackdrop = null
  #modals = null

  #burger = null
  #burgerOpen = false
  #menu = null
  #header = null

  #forms = null
  #formState = {
    'login-form': {
      login: {
        value: '',
        errors: []
      },
      password_login: {
        value: '',
        errors: []
      },
    },
    'register-form': {
      name: {
        value: '',
        errors: []
      },
      email: {
        value: '',
        errors: []
      },
      password: {
        value: '',
        errors: []
      },
      password2: {
        value: '',
        errors: []
      },
    }
  }
  #fieldErrors = {
    loginIncorrect: 'Логин должен содержать от 5 до 15 символов, состоять из букв латинского алфавита, цифр и знака подчеркивания.',
    passwordEmpty: 'Пароль не может быть пустым.',
    nameIncorrect: 'Имя должно содержать от 3 до 50 символов, состоять из букв латинского и кириллического алфавита, пробелов и дефиса.',
    emailIncorrect: 'Введите корректный email.',
    passwordLengthError: 'Пароль должен быть от 5 до 10 символов.',
    passwordUpperCaseError: 'Пароль должен содержать хотя бы одну букву в верхнем регистре.',
    passwordLowerCaseError: 'Пароль должен содержать хотя бы одну букву в нижнем регистре.',
    passwordDigitError: 'Пароль должен содержать хотя бы одну цифру.',
    passwordSpecCharError: 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).',
    passwordConfirmError: 'Пароли не совпадают.',
    checkFormField: 'Форма содержит ошибки:'
  }

  constructor() {
    this.init()
  }

  init() {
    this.#setOverflow(true)

    this.#cachedImg()

    this.#header = document.querySelector(".header")

    this.#statsEl = document.querySelectorAll('.stat-digit');
    if (this.#statsEl) {
      this.#observeStatsElements()
    }

    this.#sections = document.querySelectorAll('section')
    this.#menuLinks = document.querySelectorAll('.header__nav-menu .nav__link');

    if (this.#sections && this.#menuLinks) {
      this.#observeSectionsElements()
    }

    this.#scrollToLinks = document.querySelectorAll('a[data-scroll-to]');
    if (this.#scrollToLinks) {
      this.#scrollToInit()
    }

    this.#modalOpenLinks = document.querySelectorAll('[data-modal-open]');
    this.#modalCloseLinks = document.querySelectorAll('[data-modal-close]');
    this.#modalBackdrop = document.querySelector('.modal-backdrop');
    this.#modals = document.querySelectorAll('dialog.modal');

    if (this.#modalOpenLinks && this.#modalCloseLinks && this.#modalBackdrop && this.#modals) {
      this.#modalInit()
    }

    this.#burger = document.querySelector('.header__burger');
    this.#menu = document.querySelector('.header__nav-menu');
    if (this.#burger && this.#menu) {
      this.#burgerInit()
    }

    this.#forms = document.querySelectorAll('form');
    if (this.#forms) {
      this.#formsInit()
    }
    this.#setOverflow(false)
  }

  #delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
  /**
   * @private
   * @method useFetch
   * @description использует fetch для отправки данных на сервер
   * @param {Array} fields - массив полей для отправки
   * @returns {Promise}
   * @throws {Error} Если элемент не существует
   */  
  #useFetch = (fields = []) => {
    return new Promise(async resolve => {
      try {
        await this.#delay(3000)

        const formData = new FormData()
        for (const field of fields) {
          formData.append(field.name, field.value)
        }

        fetch(this.#apiUrl, {
          method: 'POST',
          credentials: 'same-origin',
          body: formData
        })
          .then(r => r.json())
          .then(data => {
            resolve(data)
          })
          .catch(({message}) => {
            resolve({
              status: false,
              data: null,
              alerts: [message]
            })
          })

      } catch ({message}) {
        resolve({
          status: false,
          data: null,
          alerts: [message]
        })
      }
    })
  }

  /**
   * @private
   * @method safeSetStyle
   * @description Безопасно устанавливает CSS-свойство для элемента
   * @param {HTMLElement} element - HTML элемент
   * @param {string} property - CSS свойство
   * @param {string} value - Значение CSS свойства
   * @returns {void}
   * @throws {Error} Если элемент не существует
   */
  #safeSetStyle = (element, property, value, important = null) => {
    if (!element || !property || typeof value !== 'string') return;

    try {
      element.style.setProperty(property, value, important);
    } catch (e) {
      try {
        element.setAttribute('style', `${property}: ${value} ${important || ''}`);
      } catch (e) {
        console.warn(`safeSetStyle: Failed to set style for ${property}`, e);
      }
    }
  };
  /**
   * @private
   * @method animateStats
   * @description Анимирует счетчик
   * @param {HTMLElement} element - HTML элемент
   * @param {number} duration - Длительность анимации
   * @returns {void}
   */
  #animateStats = (element, duration) => {
    const targetValue = parseInt(element.getAttribute('data-count'), 10);
    const startValue = 0;
    const increment = targetValue / (duration / 10);
    let currentValue = startValue;
    const timer = setInterval(() => {

      currentValue += increment;

      if (currentValue >= targetValue) {

        currentValue = targetValue;

        clearInterval(timer);
      }

      element.textContent = Math.floor(currentValue);
    }, 10);
  };
  /**
   * @private
   * @method observeStatsElements
   * @description Наблюдает за элементами счетчиков
   * @returns {void}
   */
  #observeStatsElements = () => {
    const observerOptions = {
      root: this.#animateStataParams.root,
      rootMargin: this.#animateStataParams.rootMargin,
      threshold: this.#animateStataParams.threshold
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const duration = this.#animateStataParams.duration;

          this.#animateStats(element, duration);
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    this.#statsEl.forEach(element => {
      observer.observe(element);
    });
  };
  #observeSectionsElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;

        this.#menuLinks.forEach(link => {
          const parent = link.parentElement;
          const sectionIdFromLink = link.getAttribute('href');

          if (sectionIdFromLink === `#${sectionId}`) {
            if (entry.isIntersecting) {
              parent.classList.add(this.#highlightActiveMenuParams.activeClass);
            } else {
              parent.classList.remove(this.#highlightActiveMenuParams.activeClass);
            }
          }
        });
      });
    }, {
      root: this.#highlightActiveMenuParams.root,
      rootMargin: this.#highlightActiveMenuParams.rootMargin,
      threshold: this.#highlightActiveMenuParams.threshold
    });
    this.#sections.forEach(section => {
      observer.observe(section);
    });
  }
  /**
   * @private
   * @method getScrollbarWidth
   * @description Вычисляет ширину полосы прокрутки
   * @returns {string} Ширина полосы прокрутки в пикселях
   */
  #getScrollbarWidth = () => {
    const outer = document.createElement('div')
    this.#safeSetStyle(outer, 'visibility', 'hidden')
    this.#safeSetStyle(outer, 'overflow', 'scroll')
    this.#safeSetStyle(outer, 'msOverflowStyle', 'scrollbar')
    this.#safeSetStyle(outer, 'width', '100px')
    this.#safeSetStyle(outer, 'height', '100px')
    this.#safeSetStyle(outer, 'position', 'hidden')
    this.#safeSetStyle(outer, 'top', '-9999px')

    document.body.appendChild(outer)

    const inner = document.createElement('div')
    this.#safeSetStyle(outer, 'width', '100%')
    this.#safeSetStyle(outer, 'height', '100%')
    outer.appendChild(inner)

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

    outer.parentNode.removeChild(outer)

    return scrollbarWidth
  }
  /**
   * @private
   * @method setOverflow
   * @description Управляет overflow и padding для body при открытии/закрытии меню
   * @param {string} overflow - Значение для свойства overflow
   * @param {string} [scrollbarWidth='0px'] - Ширина полосы прокрутки
   * @returns {void}
   */
  #setOverflow = (status = true) => {
    const scrollbarWidth = status
      ? `${this.#getScrollbarWidth()}px`
      : ''
    const overflow = status
      ? 'hidden'
      : ''

    // this.#safeSetStyle(document.body, 'overflow', overflow)
    // this.#safeSetStyle(document.body, 'paddingRight', scrollbarWidth)
    //
    // this.#safeSetStyle(document.head, 'overflow', overflow)
    // this.#safeSetStyle(document.head, 'paddingRight', scrollbarWidth)

    const html = document.querySelector('html')

    this.#safeSetStyle(html, 'overflow', overflow)
    // this.#safeSetStyle(html, 'paddingRight', scrollbarWidth)
  }
  /**
   * @private
   * @method fetchAndCache
   * @description Кэширует изображения
   * @param {string} mediaFileUrl - URL изображения
   * @param {Cache} cache - Кэш
   * @returns {Promise}
   */
  #fetchAndCache(mediaFileUrl, cache) {
    return cache.match(mediaFileUrl)
      .then(cacheResponse => {
        if (cacheResponse) {
          return cacheResponse
        }
        return fetch(mediaFileUrl, {cache: 'force-cache'})
          .then(networkResponse => {
            cache.put(mediaFileUrl, networkResponse.clone())
            return networkResponse
          })
      })
  }
  /**
   * @private
   * @method cachedImg
   * @description Кэширует изображения
   * @returns {Promise}
   */
  #cachedImg = async () => {
    if (location.origin.startsWith('file://') || !('caches' in window)) return;

    try {
      const images = document.querySelectorAll('img');
      const imageUrls = [...new Set(Array.from(images).map(img => img.dataset.src || img.src))];

      const cache = await caches.open('image-pre-cache');
      await Promise.all(imageUrls.map(url => this.#fetchAndCache(url, cache)));

    } catch (error) {
      console.error("Error caching images:", error);
    }
  };

  /**
   * @private
   * @method modalInit
   * @description Инициализирует модальные окна
   * @returns {void}
   */
  #modalInit = () => {
    let clicked = 0

    const getModalOpened = () => {
      return Array.from(this.#modals).find(modal_ => modal_.open);
    }
    const getModalById = (id) => {
      return Array.from(this.#modals).find(modal_ => modal_.dataset.modal === id);
    }
    const actionModal = (modal, method = 'showModal' || 'close') => {
      const dialog = getModalById(modal);
      const openDialog = getModalOpened()

      this.#formsReset()

      if (dialog) {
        switch (method) {
          case "showModal":
            openDialog?.close()
            dialog.showModal()
            this.#setOverflow(true)
            this.#modalBackdrop.classList.add('show');
            break;
          case 'close':
            dialog.close()
            clicked = 0
            this.#modalBackdrop.classList.remove('show');
            this.#setOverflow(false)
        }
      }
    }
    
    this.#modalOpenLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        actionModal(e.target.dataset.modalOpen, 'showModal');
      })
    })
    this.#modalCloseLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const dialog = getModalOpened()
        actionModal(dialog.dataset.modal, 'close');
      })
    })

    document.addEventListener('click', e => {
      const openDialog = getModalOpened()
      if (openDialog) {
        clicked++
        const modalId = openDialog.dataset.modal
        const rect = openDialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog && clicked > 1) {
          actionModal(modalId, 'close');
        }
      }
    })
    document.addEventListener('keydown', e => {
      const openDialog = getModalOpened()
      if (openDialog && e.key === "Escape") {
        clicked++
        const modalId = openDialog.dataset.modal
        if (clicked > 1) {
          actionModal(modalId, 'close');
        }
      }
    })
  }
  /**
   * @private
   * @method scrollToInit
   * @description Инициализирует плавную прокрутку к элементам по клику
   * @returns {void}
   */
  #scrollToInit = () => {
    const scrollTo = (id) => {
      if (id === 'offer') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 45;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }

    this.#scrollToLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        scrollTo(e.target.dataset.scrollTo)
      })
    })
  }
  /**
   * @private
   * @method burgerInit
   * @description Инициализирует функциональность бургер-меню
   * @returns {void}
   */
  #burgerInit = () => {
    const menuToggle = () => {
      this.#burgerOpen = !this.#burgerOpen
      this.#header.classList.toggle('active')
      this.#burger.classList.toggle('active')
      this.#setOverflow(this.#burgerOpen)
    }
    const menuClose = () => {
      this.#burgerOpen = false
      this.#header.classList.remove('active')
      this.#burger.classList.remove('active')
      this.#setOverflow(false)
    }
    const menuOpen = () => {
      this.#burgerOpen = true
      this.#header.classList.add('active')
      this.#burger.classList.add('active')
      this.#setOverflow(true)
    }

    this.#burger.addEventListener('click', () => {
      menuToggle()
    })
    document.addEventListener('click', (event) => {
      if (this.#burgerOpen) {
        const clickOnMenu = event.composedPath().includes(this.#menu)
        if (clickOnMenu) {
          menuClose()
        }
      }
    })
  }
  /**
   * @private
   * @method formsInit
   * @description Инициализирует формы
   * @returns {void}
   */
  #formsInit = () => {
    const getFormById = (id) => {
      return Array.from(this.#forms).find(form => form.id === id)
    }

    const renderAlert = (container, alerts = []) => {
      if (!container) {
        return
      }

      this.#formsResetAlerts()
      container.innerHTML = ''
      alerts.forEach(alert => {
        const wrapper = document.createElement('p')
        wrapper.innerHTML = alert
        container.appendChild(wrapper)
      })

      if (alerts.length) {
        container.classList.remove('hide')
      }
    }
    /**
     * @private
     * @method submitForm
     * @description Отправляет форму
     * @param {string} id - ID формы
     * @returns {Promise}
     */
    const submitForm = async (id) => {
      const form = getFormById(id)
      form.classList.add('fetching')
      const state = this.#formState[id]
      
      const fields = [
        {name: 'form', value: id}
      ]
      for (const name in state) {
        fields.push({name, value: state[name].value})
      }

      const {status, data, alerts} = await this.#useFetch(fields)

      const alertContainerClass = status ? '.form-fieldset-success' : '.form-fieldset-error'
      const alertContainer = form.querySelector(alertContainerClass)

      renderAlert(alertContainer, status ? alerts : [this.#fieldErrors.checkFormField, ...alerts])

      if (status) {
        setTimeout(() => {
          this.#formsReset()
        }, 10000)
      }

      form.classList.remove('fetching')
    }

    document.addEventListener('change', e => {
      const formId = e?.target?.closest('form')?.id
      if (!formId) {
        return
      }

      const state = this.#formState[formId]
      const {name, value: rawValue} = e.target
      state[name].value = rawValue.trim()
    })
    document.addEventListener('submit', e => {
      e.preventDefault()
      const formId = e?.target?.closest('form')?.id
      if (!formId) {
        return
      }

      submitForm(formId)
    })
  }
  /**
   * @private
   * @method formsReset
   * @description Сбрасывает формы
   * @returns {void}
   */
  #formsReset = () => {
    if (this.#forms) {
      this.#forms.forEach((form) => {
        form.reset()
        form.querySelectorAll('.form-fieldset-alert')
          .forEach(element => {
            element.innerHTML = ''
            element.classList.add('hide')
          })
        const state = this.#formState[form.id]
        for (const name in state) {
          state[name] = {
            value: '',
            errors: []
          }
        }
      })
    }
  }
  /**
   * @private
   * @method formsResetAlerts
   * @description Сбрасывает ошибки форм
   * @returns {void}
   */
  #formsResetAlerts = () => {
    if (this.#forms) {
      this.#forms.forEach((form) => {
        form.querySelectorAll('.form-fieldset-alert')
          .forEach(element => {
            element.innerHTML = ''
            element.classList.add('hide')
          })
      })
    }
  }
}

/**
 * @constant {App} app
 * @description Экземпляр основного класса приложения
 */
const app = new App()

document.addEventListener('DOMContentLoaded', () => new App());