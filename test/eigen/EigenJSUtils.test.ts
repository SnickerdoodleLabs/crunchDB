// import eig from "eigen";
import { EigenJSUtils } from "crunchDB/implementations";

describe('EigenJSUtils tests', () => {

    it('should convert a matrix to a row vector', async () => {
        // Acquire
        const utils = new EigenJSUtils();
        // await eig.ready;
        const expected = [1, 1];

        // Act
        const mat1 = (await utils.fromJS(expected))._unsafeUnwrap(); // it will be a 1x2 matrix
        const got = (await utils.toJS(mat1))._unsafeUnwrap(); // it will be a 1x2 matrix

        expect(got).toEqual(expected);
    });

    it('[1, 2, 3] is a 1x3 matrix', async () => {
        // Acquire
        const utils = new EigenJSUtils();
        // await eig.ready;
        const expected = [1, 2, 3];

        // Act
        const mat1 = (await utils.fromJS(expected))._unsafeUnwrap(); // it will be a 1x3 matrix
        
        // Assert
        expect(mat1.rows()).toBe(1);
        expect(mat1.cols()).toBe(3);

    });

    it('[[1, 2, 3]] is a 1x3 matrix', async () => {
        // Acquire
        const utils = new EigenJSUtils();
        // await eig.ready;
        const expected = [[1, 2, 3]];

        // Act
        const mat1 = (await utils.fromJS(expected))._unsafeUnwrap(); // it will be a 1x3 matrix
        
        // Assert
        expect(mat1.rows()).toBe(1);
        expect(mat1.cols()).toBe(3);

    });

});