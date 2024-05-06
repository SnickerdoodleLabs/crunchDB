import eig from "eigen";

describe('Eigen-js tests', () => {

    it('should add two matrices', async () => {
        await eig.ready;
        const mat1 = new eig.Matrix([[1, 1], [2, 3]]);
        const mat2 = new eig.Matrix([[1, 1], [2, 2]]);

        const mat3 = mat1.matAdd(mat2);

        console.log(mat3);
        expect(mat3.get(0, 0)).toBe(2);
    });

});