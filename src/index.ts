import { AxiosInstance } from "axios";

export namespace AxiosThrottler {

    const SEC_MS = 1000;
    const MIN_S =  60;

    function validatePositiveNumber(n: number) {
        if (n < 0.0 || Number.isNaN(n))
            throw new Error(`${n} must be greater than 0.`);
        return n;
    }

    /**
     * Computes the equivalent request interval in ms for the given `n` requests per second.
     * @param n Requests per second
     * @returns Request interval in ms
     */
    export const rps = (n: number) => SEC_MS / n;

    /**
     * Computes the equivalent request interval in ms for the given `n` requests per minute.
     * @param n Requests per minute
     * @returns Request interval in ms
     */
    export const rpm = (n: number) => rps(n) * MIN_S;

    /**
     * Applies rate limit to the given `ax` Axios Instance to guarante one call every `requestInterval` ms.
     * @param a The AxiosInstance to apply rate limit.
     * @param rps The maximum allowed number of requests per second.
     */
    export function throttle(ax: AxiosInstance, requestInterval: number) {

        requestInterval = Math.ceil(validatePositiveNumber(requestInterval));

        let lastRequestTime = Date.now();
        let queuedRequests = 0;

        ax.interceptors.request.use(request => {

            queuedRequests ++;

            const currentTime = Date.now();
            // Calculate the time elapsed since the last request
            const timeSinceLastRequest = currentTime - lastRequestTime;
            lastRequestTime = currentTime;
            if (timeSinceLastRequest < requestInterval * queuedRequests) {
                // Delay the request by the remaining time until the next allowed request
                const delay = requestInterval * queuedRequests - timeSinceLastRequest;
                return new Promise(
                    resolve => {
                        setTimeout(() => {
                                queuedRequests--;
                                resolve(request);
                            },
                            delay
                            )
                        }
                    );
            }
            
            // No delay required, proceed with the request
            queuedRequests--;
            return request;
        });

    }

}
