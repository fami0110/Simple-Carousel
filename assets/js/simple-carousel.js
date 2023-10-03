class Carousel {
  id;
  parent;
  children;
  slider;
  dots;
  activeItemIndex;
  autoplay;

  constructor(id) {
    const container = document.querySelector(`#${id}`);
    const items = document.querySelectorAll(`#${id} > *`);
    this.id = id;

    let itemsConstruct = '';
    items.forEach(e => {
      itemsConstruct += `<div class="carousel-item">${e.outerHTML}</div>`;
    });

    let builder = `
      <div class="carousel-ui">
        <span class="material-symbols-rounded slider slide-backward">arrow_back_ios_new</span>
        <span class="material-symbols-rounded slider slide-forward">arrow_forward_ios</span>
        <div class="dots"></div>
      </div>
      <div class="carousel-content">
        ${itemsConstruct}
      </div>
    `;
    container.innerHTML = builder;
    container.classList.add('carousel');

    this.init();
  }

  init() {
    this.parent = document.querySelector(`#${this.id} .carousel-content`);
    this.children = document.querySelectorAll(`#${this.id} .carousel-item`)
    this.slider = document.querySelectorAll(`#${this.id} .slider`);
    this.dots = document.querySelector(`#${this.id} .carousel-ui .dots`);
    this.activeItemIndex = 0;
    this.autoplay = setInterval(() => {
      this.scrollToIndex(this.activeItemIndex + 1);
    }, 4000);

    this.slider.forEach(e => {
      e.addEventListener('click', () => {
        if (e.classList.contains('slide-backward')) {
          this.scrollToIndex(this.activeItemIndex - 1);
        } else if (e.classList.contains('slide-forward')) {
          this.scrollToIndex(this.activeItemIndex + 1);
        }
      });
    });

    for (let i = 0; i < this.children.length; i++) {
      this.dots.innerHTML += `<span data-index="${i}"></span>`;
    }
    this.dots = this.dots.querySelectorAll('.dots > *');
    this.updateActiveDot(this.activeItemIndex);

    this.dots.forEach(dot => {
      dot.addEventListener('click', e => {
        let btn = e.target;
        if (!btn.classList.contains('active')) {
          this.scrollToIndex(parseInt(btn.dataset.index));
        }
      });
    });
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
  
    let offsetX = document.body.clientWidth * this.activeItemIndex;
    this.parent.scrollTo(offsetX, 0);
  
    this.refreshAutoplay();
    this.updateActiveDot(this.activeItemIndex);
  }
  
  refreshAutoplay() {
    clearInterval(this.autoplay);
    this.autoplay = setInterval(() => {
      this.scrollToIndex(this.activeItemIndex + 1);
    }, 4000);
  }
  
  updateActiveDot(index){
    this.dots.forEach(dot => {
      dot.classList.remove('active');
    });
    this.dots[index].classList.add('active');
  }

}