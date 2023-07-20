"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosThrottler = void 0;
var AxiosThrottler;
(function (AxiosThrottler) {
    const SEC_MS = 1000;
    const MIN_S = 60;
    function validatePositiveNumber(n) {
        if (n < 0.0 || Number.isNaN(n))
            throw new Error(`${n} must be greater than 0.`);
        return n;
    }
    AxiosThrottler.rps = (n) => SEC_MS / n;
    AxiosThrottler.rpm = (n) => AxiosThrottler.rps(n) * MIN_S;
    function throttle(ax, requestInterval) {
        requestInterval = Math.ceil(validatePositiveNumber(requestInterval));
        let lastRequestTime = Date.now();
        let queuedRequests = 0;
        ax.interceptors.request.use(request => {
            queuedRequests++;
            const currentTime = Date.now();
            const timeSinceLastRequest = currentTime - lastRequestTime;
            lastRequestTime = currentTime;
            if (timeSinceLastRequest < requestInterval * queuedRequests) {
                const delay = requestInterval * queuedRequests - timeSinceLastRequest;
                return new Promise(resolve => {
                    setTimeout(() => {
                        queuedRequests--;
                        resolve(request);
                    }, delay);
                });
            }
            queuedRequests--;
            return request;
        });
    }
    AxiosThrottler.throttle = throttle;
})(AxiosThrottler || (exports.AxiosThrottler = AxiosThrottler = {}));
