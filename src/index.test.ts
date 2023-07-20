import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { expect } from "chai";

import { axiosThrottler } from ".";

export const timer = (ms: number) => new Promise(f => setTimeout(f, ms));

describe("axiosThrottler Tests", () => {
        
    it("Should execute inmediately the first call, and delay the second one", async () => {
        
        const client = axios.create({baseURL: 'https://sampleurl.com'});
        const rps = 1;

        axiosThrottler(client, rps);

        const mock = new MockAdapter(client, {delayResponse: 1});
        mock.onGet("/").reply(200, {
            success: true,
        });

        let executed = 0;

        client.get('/').then(() => executed++);
        client.get('/').then(() => executed++);

        await timer(1010);
        expect(executed).to.be.eq(1);

        await timer(2000);
        expect(executed).to.be.eq(2);

        mock.restore();

    });

});
