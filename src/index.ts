export * from './implementations/index.js';
export * from './interfaces/index.js';
export * from './objects/index.js';


export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
