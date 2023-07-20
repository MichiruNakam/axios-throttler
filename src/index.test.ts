import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { expect } from "chai";

import { AxiosThrottler } from ".";

export const timer = (ms: number) => new Promise(f => setTimeout(f, ms));

describe("AxiosThrottler Tests", () => {

    describe("rps Tests", () => {

        it("Calculate the request interval accordingly", () => {

            expect(Math.round(AxiosThrottler.rps(1))).be.eq(1000);
            expect(Math.round(AxiosThrottler.rps(2))).be.eq(500);
            expect(Math.round(AxiosThrottler.rps(5))).be.eq(200);

        });

    });

    describe("rpm Tests", () => {

        it("Calculate the request interval accordingly", () => {

            expect(Math.round(AxiosThrottler.rpm(60))).be.eq(1000);
            expect(Math.round(AxiosThrottler.rpm(30))).be.eq(2000);
            expect(Math.round(AxiosThrottler.rpm(120))).be.eq(500);

        });

    });

    describe("throttle Tests", () => {

        it("Throw when the requestInterval is invalid", () => {

            const client = axios.create({baseURL: 'https://sampleurl.com'});

            expect(() => AxiosThrottler.throttle(client, -1)).to.throw().and.to.have.property('message').that.is.not.empty;
            expect(() => AxiosThrottler.throttle(client, NaN)).to.throw().and.to.have.property('message').that.is.not.empty;

        });
        
        it("Should execute inmediately the first call, and delay the second one", async () => {
            
            const client = axios.create({baseURL: 'https://sampleurl.com'});

            AxiosThrottler.throttle(client, AxiosThrottler.rps(1));

            const mock = new MockAdapter(client, {delayResponse: 1});
            mock.onGet("/").reply(200, {
                success: true,
            });

            let executed = 0;

            client.get('/').then(() => executed++);
            client.get('/').then(() => executed++);

            await timer(1100);
            expect(executed).to.be.eq(1);

            await timer(2100);
            expect(executed).to.be.eq(2);

            mock.restore();

        });

    });

});
