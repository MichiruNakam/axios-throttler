# Axios Throttler

A simple and lightweight request rate-limiter for axios. Implements a very simple leaky-bucket algorithm to rate limit requests for any axios client you provide. So for two request calls with rps = 2, the first will be called at second 0, and the last one at second 0,5.

## Why Axios Throttler?

+ Extremely lightweight, just 37 lines of code
+ Typescript first
+ Updated as of 2024
+ Dependency-less!

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

## Changelog

* v0.2.0 - Axios is now a peer-dependency instead of a dependency. This change should not give any compatibility problem, unless for some reason you were using an axios version prior of 1.x.
* v0.1.1 - Initial stable release

## TODO

* Add Javascript example
* Improve existing test
* Add tests for global axios instance
