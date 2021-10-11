const slides = document.querySelectorAll('.slider__slide');
const dots = document.querySelectorAll('.slider__dot');

if ('onwheel' in window) {
  document.addEventListener('wheel', onWheel, {once: true});
}

if ('ontouchstart' in window) {
  document.addEventListener('touchstart', onSwipe, {once: true});
}

function onWheel(e) {
  const isReverse = e.deltaY < 0;
  const activeSlide = document.querySelector('.slider__slide--active');
  const animatedSlide = isReverse ? activeSlide : activeSlide.nextElementSibling;
  const dot = document.querySelector('.slider__dot--active');

  if (!isLimit(activeSlide, isReverse)) {
    animateSlide(activeSlide, animatedSlide, dot, isReverse);
  }

  document.addEventListener('wheel', onWheel, {once: true});
}

function onSwipe(e) {
  const startY = e.changedTouches[0].pageY;

  document.ontouchend = eEnd => {
    const endY = eEnd.changedTouches[0].pageY;
    const difference = endY - startY;

    if (Math.abs(difference) > 50) {
      const isReverse = endY < startY;

      const activeSlide = document.querySelector('.slider__slide--active');
      const animatedSlide = isReverse ? activeSlide : activeSlide.nextElementSibling;
      const dot = document.querySelector('.slider__dot--active');

      if (!isLimit(activeSlide, isReverse)) {
        animateSlide(activeSlide, animatedSlide, dot, isReverse);
      }
    }
  };

  document.addEventListener('touchstart', onSwipe, {once: true});
}

function animateSlide(activeSlide, animatedSlide, dot, isReverse) {
  gsap.to(animatedSlide, {x: isReverse ? 0 : '-100%', onComplete: () => {
    if (isReverse) {
      changeSlideActiveClass(animatedSlide, animatedSlide.previousElementSibling);
      changeActiveDot(dot, dot.previousElementSibling);
    } else {
      changeSlideActiveClass(activeSlide, animatedSlide);
      changeActiveDot(dot, dot.nextElementSibling);
    }
  }});
}

function changeSlideActiveClass(active, current) {
  if (active && current) {
    active.classList.remove('slider__slide--active');
    current.classList.add('slider__slide--active');
  }
}

function changeActiveDot(active, current) {
  if (active && current) {
    active.classList.remove('slider__dot--active');
    current.classList.add('slider__dot--active');
  }
}

function isLimit(activeSlide, isReverse) {
  if (isReverse) {
    return !activeSlide.previousElementSibling;
  }

  return !activeSlide.nextElementSibling;
}
