import request from "supertest";
import {beforeEach, describe, expect, test} from "@jest/globals";
import { validUser, UserTest } from "../factories";
import User from "../../src/models/user";
import app from "../../src/app";

describe('/users/:userExtId', () => {
    let user1: UserTest;
    let user2: UserTest;
    let user3: UserTest;
    beforeEach(async () => {
        user1 = validUser();
        await new User({...user1}).save();
        user2 = validUser();
        await new User({...user2}).save();
        user3 = validUser();
        await new User({...user3}).save();
    });

    test('returns a valid user list', (done) => {
        request(app)
            .get(`/api/users/${user1.externalIdentifier}`)
            .expect('Content-Type', /json/)
            .expect((res) => {
                const userList = res.body;
                expect(userList).toHaveLength(2)
                expect(userList[0].externalIdentifier).toEqual(user2.externalIdentifier);
                expect(userList[1].externalIdentifier).toEqual(user3.externalIdentifier);

            })
            .expect(200, done);
    })
});
