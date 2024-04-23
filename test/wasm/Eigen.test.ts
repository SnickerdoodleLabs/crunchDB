const fs = require('fs');
var eigenFactory = require('../../src/wasm/eigen_mod.js');
// var eigenFactory = require('../../src/wasm/eigen.js');

// console.log('eigenFactory', eigenFactory);

// eigenFactory().then((eigen: unknown) => {
//     console.log(eigen);
//     // console.log(eigen.cwrap('float_matrix_matrix_add', 'number', ['number', 'number', 'number', 'number', 'number', 'number']));
//     // console.log(eigen.cwrap.float_matrix_matrix_add)
// });

// imports.env = imports.env || {}

// Object.assign(imports.env, {
//   tableBase: module.tableBase,
//   table: new WebAssembly.Table({
//     initial: 4,
//     element: 'anyfunc',
//   }),
//   print:function(msg){
//     console.log(msg);
//   }
// });

function makeVectorFloat32Ptr(eigen: any, size: number) {
    const ptr = eigen.malloc(size * Float32Array.BYTES_PER_ELEMENT);
    return ptr;
}

function vector2Float32Ptr(eigen: any, vector: Float32Array) {
    const ptr = eigen.malloc(vector.length * Float32Array.BYTES_PER_ELEMENT);
    // eigen.HEAPF32.set(vector, ptr);
    eigen.HEAPF32.set(vector, ptr / Float32Array.BYTES_PER_ELEMENT);
    return ptr;
}

function float32Ptr2Vector(eigen: any, ptr: number, size: number): Float32Array {
    return eigen.HEAPF32.subarray(ptr / Float32Array.BYTES_PER_ELEMENT, ptr / Float32Array.BYTES_PER_ELEMENT + size);
}
function makeAPI(eigen: any) {
    const api = {
        version: eigen.cwrap('version', 'number', []),
        add: eigen.cwrap('float_matrix_matrix_add', 'null', ['number', 'number', 'number', 'number', 'number', 'number', Number]),
        malloc: eigen._malloc,
        HEAPF32: eigen.HEAPF32,
    }
    return api;
}
describe('Eigen', () => {
    // let eigen: any;
    beforeAll(async () => {
        // const wasmBinary = fs.readFileSync('./src/wasm/eigen.wasm');
        // console.log(wasmBinary);
        // // var asmLibraryArg = {
        // //   "__assert_fail": ___assert_fail,
        // //   "__cxa_allocate_exception": ___cxa_allocate_exception,
        // //   "__cxa_throw": ___cxa_throw,
        // //   "emscripten_memcpy_big": _emscripten_memcpy_big,
        // //   "emscripten_resize_heap": _emscripten_resize_heap
        // // };
        // // var info = {
        // //   'env': asmLibraryArg,
        // //   'wasi_snapshot_preview1': asmLibraryArg,
        // // };
        // const imports =  {
        //     env: {
        //         memoryBase: 0,
        //         tableBase: 0,
        //         memory: new WebAssembly.Memory({ initial: 1024 }),
        //         table: new WebAssembly.Table({ initial: 16, element: 'anyfunc' }),
        //         abort: console.log
        //     }
        // }
        // const eigen = await WebAssembly.instantiate(new Uint8Array(wasmBinary), imports)                        .then(result => result.instance.exports);
        // console.log(eigen);
    })
    // const eigenFactory = require('../../src/wasm/eigen.js');
    // console.log(eigenFactory);
    it('should add two matrices', async () => {
        const mat1 = Float32Array.from([1, 2, 3, 4]);
        const mat2 = Float32Array.from([5, 6, 7, 8]);
        const api =  await eigenFactory().then((eigen: any) => {
            return makeAPI(eigen);
        });
        // console.log('api', api);
        let mat1ptr = vector2Float32Ptr(api, mat1);
        console.log('mat1ptr', mat1ptr);
        console.log('mat1ptr to array again', float32Ptr2Vector(api, mat1ptr, 4));
        let mat2ptr = vector2Float32Ptr(api, mat2);
        console.log('mat2ptr', mat2ptr);
        console.log('mat2ptr to array again', float32Ptr2Vector(api, mat2ptr, 4));
        expect(mat1).toEqual(float32Ptr2Vector(api, mat1ptr, 4));

        // console.log(api);
        // let result = Float32Array.from({ length: 4 });
        // api.add(1, 1, 1, 4, mat1, mat2, result);
        // const result = eigen.float_matrix_matrix_add(1, 1, 1, 4, mat1, mat2);
        // console.log("result", result);
    });
});