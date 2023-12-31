# Axios Throttler

A simple and lightweight request rate-limiter for axios. The requests are delayed in a way that simultaneous requests cannot be executed within the timeframe computed according to a given rps (requests per second). So for two request calls with rps = 2, the first will be called at second 0, and the last one at second 0,5.

## Why Axios Throttler?

+ Extremely lightweight
+ Typescript first
+ Updated as of 2023
+ No dependencies besides axios

## Usage

### Typescript

To throttle axios to call a maximum of 5 requests per second:

```typescript
import { AxiosThrottler } from "axios-throttler";

const client = axios.create({baseURL: 'https://sampleurl.com'});

AxiosThrottler.throttle(client, AxiosThrottler.rps(5));
```

Alternatively, you can pass `rpm` (requests per minute):

```typescript
AxiosThrottler.throttle(client, AxiosThrottler.rpm(100));
```

## Notes

* This package works by adding a request interceptor.

## TODO

* Add Javascript example
* Improve existing test
* Add tests for global axios instance
