import WebGL from "./plugins/WebGL";
import * as THREE from "three";
import View from "./modules/View";

import { SetAnimation } from "./modules/Animation";

const CONFIG = {
  clearColor: "#060406",
  pixelRatio: 1
};

window.addEventListener("DOMContentLoaded", () => {
  if (!WebGL.isWebGLAvailable()) {
    console.log(
      "Your browser doesn't support WebGL. Imposible to run 3D animation."
    );

    return;
  }

  const source = document.querySelector("#scene");
  const sizes = {
    width: source.offsetWidth,
    height: source.offsetHeight
  };

  const view = new View({ ...CONFIG, source, sizes });
  view.setup();

  const { scene, model, light, camera, renderer } = view.getComponents();

  window.addEventListener("resize", () => {
    sizes.width = source.offsetWidth;
    sizes.height = source.offsetHeight;

    view.resize(sizes);
  });

  (function update() {
    window.requestAnimationFrame(update);

    model.rotation.y += 0.001;
    renderer.render(scene, camera);
  })();

  SetAnimation(
    model,
    light[0],
    light[2],
    new THREE.Color("#B31E12"),
    new THREE.Color("#FF200D")
  );
});
