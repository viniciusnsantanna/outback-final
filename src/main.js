import './style.css';

const track = document.querySelector('.carousel-track');
const originalImages = document.querySelectorAll('.carousel-track img');
const firstClone = originalImages[0].cloneNode(true);
track.appendChild(firstClone);

let index = 0;

function moveCarousel() {
  index++;
  track.style.transition = 'transform 1s ease-in-out';
  track.style.transform = `translateX(-${index * 100}%)`;
}

track.addEventListener('transitionend', () => {
  if (index >= originalImages.length) {
    track.style.transition = 'none';
    index = 0;
    track.style.transform = `translateX(0)`;
  }
});

setInterval(moveCarousel, 20000);

const multiTrack = document.querySelector('.multi-carousel-track');
const items = document.querySelectorAll('.multi-carousel-item');
const dots = document.querySelectorAll('.dot');

items.forEach((item, i) => {
  if (i < 3) {
    const clone = item.cloneNode(true);
    multiTrack.appendChild(clone);
  }
});

let multiIndex = 0;
const gap = 24;

function goToSlide(targetIndex) {
  multiIndex = targetIndex;
  const itemWidth = document.querySelector('.multi-carousel-item').clientWidth;
  
  multiTrack.style.transition = 'transform 0.5s ease-in-out';
  multiTrack.style.transform = `translateX(-${multiIndex * (itemWidth + gap)}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === multiIndex);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
  });
});

window.addEventListener('resize', () => {
  multiTrack.style.transition = 'none';
  const itemWidth = document.querySelector('.multi-carousel-item').clientWidth;
  multiTrack.style.transform = `translateX(-${multiIndex * (itemWidth + gap)}px)`;
});