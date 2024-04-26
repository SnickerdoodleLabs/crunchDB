
export interface ISimilarityMeasure {
    compute(a: number[], b: number[]): number;
}