import * as CONST from './const';

export default function (degrees: number): number {
    return degrees * CONST.DEG_TO_RAD;
};