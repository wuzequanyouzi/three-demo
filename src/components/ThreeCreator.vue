<template>
  <div class="container" ref="container">
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: window.innerWidth
  },
  height: {
    type: Number,
    default: window.innerHeight
  }
})

const container = ref(null);

// 创建场景对象
const scene = new THREE.Scene();

// 创建网格模型
const geometry = new THREE.BoxGeometry(100, 100, 100);
const sphereGeometry = new THREE.SphereGeometry(50, 40, 40);

// 创建材质对象
const material = new THREE.MeshLambertMaterial({
  color: 0xFFFFFF
});
// 创建网格模型对象
const mesh = new THREE.Mesh(geometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);

sphereMesh.translateX(200);
sphereMesh.translateY(150);

// 添加进场景
scene.add(mesh);
scene.add(sphereMesh);

// 设置光源
const point = new THREE.PointLight(0x330000);
point.position.set(400, 200, 300);
// 点光源进入场景
scene.add(point);
// 环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 创建相机
const width = ref(props.width).value;
const height = ref(props.height).value;
const k = width / height;// 宽高比
const s = 200;
const camera = new THREE.OrthographicCamera(-s*k, s*k, s, -s, 1, 1000); // 创建相机对象 投影相机
camera.position.set(200, 300, 200); // 位置设置
camera.lookAt(scene.position); // 相机镜头朝向

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x3e3e3e, 1);

let T0 = new Date();

const render = () => {
  let T1 = new Date();
  let t = T1 - T0;
  T0 = T1;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  mesh.rotateY(0.001 * t);
}

const controls = new OrbitControls(camera, renderer.domElement);
console.log(controls);

onMounted(() => {
  console.log(container.value)
  container.value.append(renderer.domElement);
  renderer.render(scene, camera);
  render();
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
