import Factorial from './Factorial'

export default function (n: number, i: number): number {
    return Factorial(n) / Factorial(i) / Factorial(n - i);
};