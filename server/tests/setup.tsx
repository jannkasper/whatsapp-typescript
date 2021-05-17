import mongoose from "mongoose";
import {afterEach, beforeEach} from "@jest/globals";
import { DoneFn } from "@jest/types/build/Global";
import config from "../src/config";
import { connect } from "../src";

const clearDb = async (done: DoneFn | undefined) => {
    await mongoose.connection.dropDatabase();
    return done && done();
};

beforeEach(async (done: DoneFn | undefined) => {
    if (mongoose.connection.readyState === 0) {
        await connect(config.db.test);
    }

    return clearDb(done);
});

afterEach(async (done: DoneFn | undefined) => {
    await mongoose.connection.close();
    return done && done()
});
