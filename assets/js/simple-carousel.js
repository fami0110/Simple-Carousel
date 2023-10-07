class Carousel {
  id;
  carousel;
  parent;
  children;
  ui;
  slider;
  dots;
  activeItemIndex;
  autoplay;
  cooldown = false;

  config = {
    width: '100%',
    height: '100vh',
    navigation_mode: 0,
    backdrop_opacity: 0,
    autoplay: true,
    autoplay_delay: 4000,
    press_cooldown: true,
  };

  constructor(id, config = this.config) {
    try {
      // Select the element
      const container = document.querySelector(`#${id}`);
      const items = document.querySelectorAll(`#${id} > *`);

      // Construct and wrap the item with 'carousel-item' class
      let itemsConstruct = '';
      items.forEach(e => {
        itemsConstruct += `<div class="carousel-item">${e.outerHTML}</div>`;
      });

      // Rebuild the container innerHTML
      let builder = `
        <div class="carousel-ui">
          <div class="navigation">
            <span class="material-symbols-rounded slider slide-backward">arrow_back_ios_new</span>
            <div class="dots"></div>
            <span class="material-symbols-rounded slider slide-forward">arrow_forward_ios</span>
          </div>
        </div>
        <div class="carousel-content">
          ${itemsConstruct}
        </div>
      `;
      container.innerHTML = builder;
      container.classList.add('carousel');

      // Set the id and config
      this.id = id;
      this.config = {...this.config, ...config};

      // Init the carousel
      this.init();
    } catch (err) {
      console.error(err);
    }
  }

  init() {
    // Setup all properties
    this.carousel = document.getElementById(this.id);
    this.parent = document.querySelector(`#${this.id} .carousel-content`);
    this.children = document.querySelectorAll(`#${this.id} .carousel-item`)
    this.ui = document.querySelector(`#${this.id} .carousel-ui`);
    this.slider = document.querySelectorAll(`#${this.id} .slider`);
    this.dots = document.querySelector(`#${this.id} .carousel-ui .dots`);
    this.activeItemIndex = 0;

    // Add event listener to slider buttons
    this.slider.forEach(e => {
      e.addEventListener('click', () => {
        if (this.refreshCooldown()) {
          if (e.classList.contains('slide-backward')) {
            this.scrollToIndex(this.activeItemIndex - 1);
          } else if (e.classList.contains('slide-forward')) {
            this.scrollToIndex(this.activeItemIndex + 1);
          }
        }
      });
    });

    // Add dots
    for (let i = 0; i < this.children.length; i++) {
      this.dots.innerHTML += `<span data-index="${i}"></span>`;
    }
    this.dots = this.dots.querySelectorAll('.dots > *');
    this.updateActiveDot(this.activeItemIndex);

    // Add event listener to dots
    this.dots.forEach(dot => {
      dot.addEventListener('click', e => {
        if (this.refreshCooldown()) {
          if (!dot.classList.contains('active')) {
            this.scrollToIndex(parseInt(dot.dataset.index));
          }
        }
      });
    });

    // Set navigation mode
    switch (this.config.navigation_mode) {
      case 1:
        this.ui.classList.add('mode-1');
        break;
      case 2:
        this.ui.classList.add('mode-2');
        break;
      case 3:
        this.ui.classList.add('mode-3');
        break;
      case 4:
        this.ui.classList.add('mode-4');
        break;
      case 5:
        this.ui.classList.add('mode-5');
        this.config.autoplay = true;
        break;
    }

    // Set the width and height carousel
    this.carousel.style.width = this.config.width;
    this.carousel.style.height = `calc(${this.config.height} + 18px)`;

    // Set backdrop opacity
    this.ui.style.backgroundColor = `rgba(0, 0, 0, ${this.config.backdrop_opacity})`

    // Refresh autoplay
    if (this.config.autoplay) this.refreshAutoplay();
  }

  refreshCooldown() {
    if (this.config.press_cooldown) {
      if (!this.cooldown) {
        this.cooldown = true;

        setTimeout(() => {
          this.cooldown = false;
        }, 500);

        return true;
      }
      return false;
    }
    return true;
  }

  scrollToIndex(index) {
    let itemLength = this.children.length - 1;
  
    if (index < 0) {
      this.activeItemIndex = itemLength;
    } else if (index > itemLength) {
      this.activeItemIndex = 0;
    } else {
      this.activeItemIndex = index;
    }
  
    let offsetX = this.parent.getBoundingClientRect().width * this.activeItemIndex;
    this.parent.scrollTo(offsetX, 0);
  
    if (this.config.autoplay) this.refreshAutoplay();
    this.updateActiveDot(this.activeItemIndex);
  }
  
  refreshAutoplay() {
    clearInterval(this.autoplay);
    this.autoplay = setInterval(() => {
      this.scrollToIndex(this.activeItemIndex + 1);
    }, this.config.autoplay_delay);
  }
  
  updateActiveDot(index){
    this.dots.forEach(dot => {
      dot.classList.remove('active');
    });
    this.dots[index].classList.add('active');
  }

}