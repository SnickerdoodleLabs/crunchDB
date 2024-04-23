
// export * from './objects';
export * from './objects2';
export * from './interfaces';
export * from './implementations';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
