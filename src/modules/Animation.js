import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";

import gsap from "gsap";

export function SetAnimation(model, lightD, lightP, colorD, colorP) {
  const timeline = [
    gsap
      .timeline({
        paused: true,
        defaults: { ease: "sine.out" }
      })
      .to(model.position, { x: -10, z: 25, duration: 0.8 })
      .to(
        model.rotation,
        { y: model.rotation.y + Math.PI * 0.5, duration: 0.8 },
        0
      ),
    gsap
      .timeline({
        paused: true,
        defaults: { ease: "sine.out" }
      })
      .to(model.position, { x: 0, z: 35, duration: 1 })
      .to(
        model.rotation,
        { y: model.rotation.y + Math.PI * 0.75, duration: 1 },
        0
      ),
    gsap
      .timeline({
        paused: true,
        defaults: { ease: "sine.out" }
      })
      .to(lightP, { intensity: 1, duration: 2 }),
    gsap
      .timeline({
        paused: true,
        defaults: { ease: "sine.out" }
      })
      .to(model.position, { x: 0, z: 0.1, duration: 2 })
      .to(model.rotation, { y: model.rotation.y + Math.PI, duration: 2 }, 0)
      .to(
        lightP.color,
        { r: colorP.r, g: colorP.g, b: colorP.b, duration: 2 },
        0
      )
      .to(
        lightD.color,
        { r: colorD.r, g: colorD.g, b: colorD.b, duration: 2 },
        0
      )
  ];

  new Swiper(".page-slider", {
    direction: "vertical",
    slidesPerView: 1,
    speed: 1200,
    mousewheel: true,
    allowTouchMove: true,
    on: {
      slideChange: (event) => {
        const previous = event.previousIndex;
        const current = event.activeIndex;

        if (current > previous) {
          if (timeline[previous]) {
            timeline[previous].play();
          }
        }

        if (current < previous) {
          if (timeline[current]) {
            timeline[current].reverse();
          }
        }

        fadeUp(event.slides, event.slides[current]);
      }
    }
  });
}

function fadeUp(slides, current) {
  slides.forEach((slide) => {
    const animated = slide.querySelectorAll(".fade-up");

    if (animated && animated.length) {
      if (slide !== current) {
        animated.forEach((item) => item.classList.remove("visible"));
      } else {
        animated.forEach((item) => item.classList.add("visible"));
      }
    }
  });
}
