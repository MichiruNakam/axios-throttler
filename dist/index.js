"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosThrottler = void 0;
/**
 * Applies rate limit to the given `ax` Axios Instance to `rps` requests per second.
 * @param a The AxiosInstance to apply rate limit.
 * @param rps The maximum allowed number of requests per second.
 */
function axiosThrottler(ax, rps) {
    const requestInterval = 1000 / rps;
    let lastRequestTime = Date.now();
    let queuedRequests = 0;
    ax.interceptors.request.use(request => {
        queuedRequests++;
        const currentTime = Date.now();
        // Calculate the time elapsed since the last request
        const timeSinceLastRequest = currentTime - lastRequestTime;
        lastRequestTime = currentTime;
        if (timeSinceLastRequest < requestInterval * queuedRequests) {
            // Delay the request by the remaining time until the next allowed request
            const delay = requestInterval * queuedRequests - timeSinceLastRequest;
            return new Promise(resolve => {
                setTimeout(() => {
                    queuedRequests--;
                    resolve(request);
                }, delay);
            });
        }
        // No delay required, proceed with the request
        queuedRequests--;
        return request;
    });
}
exports.axiosThrottler = axiosThrottler;
