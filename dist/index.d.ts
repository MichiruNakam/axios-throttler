import { AxiosInstance } from "axios";
export declare namespace AxiosThrottler {
    const rps: (n: number) => number;
    const rpm: (n: number) => number;
    function throttle(ax: AxiosInstance, requestInterval: number): void;
}
