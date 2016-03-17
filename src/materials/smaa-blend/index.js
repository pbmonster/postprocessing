import shader from "./inlined/shader";
import THREE from "three";

/**
 * Subpixel Morphological Antialiasing.
 *
 * This material is used to render the final antialiasing.
 *
 * @class SMAABlendMaterial
 * @constructor
 * @extends ShaderMaterial
 * @param {Vector2} [texelSize] - The absolute screen texel size.
 */

export class SMAABlendMaterial extends THREE.ShaderMaterial {

	constructor(texelSize) {

		super({

			uniforms: {

				tDiffuse: {type: "t", value: null},
				tWeights: {type: "t", value: null},
				texelSize: {type: "v2", value: (texelSize !== undefined) ? texelSize : new THREE.Vector2()}

			},

			fragmentShader: shader.fragment,
			vertexShader: shader.vertex

		});

	}

}