import * as THREE from "three";

function CreateModel() {
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const texture = new THREE.TextureLoader().load("src/textures/texture.jpg");
  const material = new THREE.MeshPhongMaterial({ map: texture });
  const model = new THREE.Mesh(geometry, material);

  model.position.set(0, 0, 10);

  return model;
}

function CreateLight(type, color, alpha, position, distance = 5) {
  if (type === "directional") {
    const light = new THREE.DirectionalLight(color, alpha);
    light.position.set(...position);

    return light;
  }

  if (type === "point") {
    const light = new THREE.PointLight(color, alpha, distance);
    light.position.set(...position);

    return light;
  }
}

function CreateCamera(sizes) {
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 50;

  return camera;
}

function CreateRenderer(sizes, config) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(config.pixelRatio || devicePixelRatio);

  return renderer;
}

export { CreateModel, CreateLight, CreateCamera, CreateRenderer };
