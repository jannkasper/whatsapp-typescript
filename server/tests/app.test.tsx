import request from "supertest";
import {describe, expect, test} from "@jest/globals";
import app from "../src/app";

describe("Default root paths", () => {
    test("/ -> 404", (done) => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done && done();
            });
    });
    test("/api -> 404", (done) => {
        request(app)
            .get("/api/posts/")
            .then(response => {
                expect(response.statusCode).toBe(500);
                done && done();
            });
    });
});
