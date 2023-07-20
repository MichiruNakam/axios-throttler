# Axios Throttler

A simple and lightweight request rate-limiter for axios. The requests are delayed in a way that simultaneous requests cannot be executed before the computed period according to a given rps (requests per second). So two requests with rps = 2, the first will be called at second 0, and the second one at second 0,5.

## Why Axios Throttler?

+ Extremely lightweight
+ Typescript first
+ Updated as of 2023
+ No dependencies besides axios

## Usage

```typescript
import {axiosThrottler} from "axios-throttler";

const client = axios.create({baseURL: 'https://sampleurl.com'});
const rps = 1;

axiosThrottler(client, rps);
```

## Notes

* This package works by adding a request interceptor.

## TODO

* Improve existing test
* Add tests for global axios instance
* Improve input parameters (maybe adding requests-per-minute?)
