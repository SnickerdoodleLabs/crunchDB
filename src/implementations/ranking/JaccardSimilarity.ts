import { ISimilarityMeasure } from '../../interfaces/ranking/ISimilarityMeasure';

export class JaccardSimilarity implements ISimilarityMeasure {
    compute(a: number[], b: number[]): number {
        if (a.length !== b.length) {
            throw new Error('Vectors must be of the same length');
        }

        let intersection = 0;
        let union = 0;

        for (let i = 0; i < a.length; i++) {
            if (a[i] > 0 && b[i] > 0) intersection++;
            if (a[i] > 0 || b[i] > 0) union++;
        }

        return union === 0 ? 0 : intersection / union;
    }
}
