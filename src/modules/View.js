import * as THREE from "three";
import {
  CreateModel,
  CreateLight,
  CreateCamera,
  CreateRenderer
} from "./Create";

export default class View {
  constructor(config) {
    this.config = config;
    this.sizes = config.sizes;
  }

  setup() {
    this.scene = new THREE.Scene();

    this.model = CreateModel();
    this.light = [
      CreateLight("directional", "#0A1E36", 0.95, [0, 5, 10]),
      CreateLight("point", "#2366B5", 0.75, [-15, -10, 35], 100),
      CreateLight("point", "cyan", 0, [-25, -20, 50], 100)
    ];
    this.camera = CreateCamera(this.sizes);
    this.renderer = CreateRenderer(this.sizes, this.config);

    [this.model, ...this.light, this.camera].forEach((item) => {
      this.scene.add(item);
    });

    const { source } = this.config;

    this.renderer.render(this.scene, this.camera);
    source.appendChild(this.renderer.domElement);
  }

  getComponents() {
    return {
      scene: this.scene,
      model: this.model,
      light: this.light,
      camera: this.camera,
      renderer: this.renderer
    };
  }

  resize(sizes) {
    this.sizes = sizes;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }
}
