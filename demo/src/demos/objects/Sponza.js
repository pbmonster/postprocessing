import { AmbientLight, CameraHelper, DirectionalLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Creates lights.
 *
 * @private
 * @param {Boolean} shadowCameraHelper - Determines whether a shadow camera helper should be created.
 * @return {Object3D[]} The lights, light targets and, optionally, a shadow camera helper.
 */

function createLights(shadowCameraHelper) {

	const ambientLight = new AmbientLight(0x212121);
	const directionalLight = new DirectionalLight(0xffffff, 1);

	directionalLight.position.set(4, 18, 3);
	directionalLight.target.position.set(0, 7, 0);
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 2048;
	directionalLight.shadow.mapSize.height = 2048;
	directionalLight.shadow.camera.top = 20;
	directionalLight.shadow.camera.right = 20;
	directionalLight.shadow.camera.bottom = -20;
	directionalLight.shadow.camera.left = -20;
	directionalLight.shadow.camera.far = 32;

	return [ambientLight, directionalLight, directionalLight.target].concat(
		shadowCameraHelper ? [new CameraHelper(directionalLight.shadow.camera)] : []
	);

}

/**
 * Loads the Sponza model.
 *
 * @private
 * @param {Map} assets - A collection of assets. The model will be stored as "sponza".
 * @param {LoadingManager} manager - A loading manager.
 * @param {WebGLRenderer} renderer - A renderer. Will be used to initialize textures ahead of time.
 */

function load(assets, manager, renderer) {

	const anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
	const gltfLoader = new GLTFLoader(manager);

	const sponzaURL = (window.location.hostname !== "localhost") ?
		"https://cdn.jsdelivr.net/gh/vanruesc/postprocessing@latest/public/models/sponza/scene.gltf" :
		"models/sponza/scene.gltf";

	gltfLoader.load(sponzaURL, (gltf) => {

		gltf.scene.traverse((object) => {

			if(object.isMesh) {

				object.castShadow = true;
				object.receiveShadow = true;

				if(object.material.map !== null) {

					object.material.map.anisotropy = anisotropy;
					renderer.initTexture(object.material.map);

				}

				if(object.material.normalMap !== null) {

					object.material.normalMap.anisotropy = anisotropy;
					renderer.initTexture(object.material.normalMap);

				}

			}

		});

		assets.set("sponza", gltf.scene);

	});

}

/**
 * The Sponza model.
 */

export class Sponza {

	/**
	 * Creates lights.
	 *
	 * @param {Boolean} [shadowCameraHelper=false] - Determines whether a shadow camera helper should be created.
	 * @return {Object3D[]} The lights, light targets and, optionally, a shadow camera helper.
	 */

	static createLights(shadowCameraHelper = false) {

		return createLights(shadowCameraHelper);

	}

	/**
	 * Loads the Sponza model.
	 *
	 * @param {Map} assets - A collection of assets. The model will be stored as "sponza".
	 * @param {LoadingManager} manager - A loading manager.
	 * @param {WebGLRenderer} renderer - A renderer. Will be used to initialize textures ahead of time.
	 */

	static load(assets, manager, renderer) {

		load(assets, manager, renderer);

	}

}
