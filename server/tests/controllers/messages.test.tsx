import request from "supertest";
import {beforeEach, describe, expect, test} from "@jest/globals";
import {validUser, validMessage, UserTest, MessageTest} from "../factories";
import User from "../../src/models/user";
import app from "../../src/app";

describe('Message endpoint', () => {
    let user1: UserTest;
    let user2: UserTest;
    let message: MessageTest;
    const userExtId = {
        nonExisting: '12345'
    };

    beforeEach(async () => {
        user1 = validUser();
        await new User({...user1}).save();
        user2 = validUser();
        await new User({...user2}).save();
        message = validMessage(user1.externalIdentifier, user2.externalIdentifier);
    });

    describe('/message', () => {
        test('reject with with missing fields', (done) => {
            request(app)
                .post('/api/message')
                .expect((res) => {
                    expect(res.body.message).toContain('Missed required values in request.');
                })
                .expect(400, done);
        });

        test('reject with not existing userExtId', (done) => {
            request(app)
                .post('/api/message')
                .send({...message, userExtId: userExtId.nonExisting })
                .expect((res) => {
                    expect(res.body.message).toContain('There was a problem find user in database.');
                })
                .expect(400, done);
        });

        test('reject with not existing receiverExtId', (done) => {
            request(app)
                .post('/api/message')
                .send({...message, receiverExtId: userExtId.nonExisting })
                .expect((res) => {
                    expect(res.body.message).toContain('There was a problem find user in database.');
                })
                .expect(400, done);
        });

        test('/message', (done) => {
            request(app)
                .post('/api/message')
                .send(message)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    const response = res.body;
                    expect(response.type).toEqual(message.type);
                    expect(response.value).toEqual(message.value);
                    expect(response.userExtId).toEqual(message.userExtId);
                    expect(response.sessionExtId).toBeDefined();
                    expect(response.status).toBeDefined();
                })
                .expect(200, done);
        })
    });

    describe('/message/:userExtId', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/message')
                .send(message);
        });
        test('returns a valid message list', async (done) => {
            request(app)
                .get(`/api/messages/${user1.externalIdentifier}`)
                .send(message)
                .expect((res) => {
                    const messageList = res.body;
                    expect(messageList).toHaveLength(1);
                    expect(messageList[0].sessionExtId).toBeDefined();
                    expect(messageList[0].contactExtId).toBeDefined();
                    expect(messageList[0].conversation).toBeDefined();
                    expect(messageList[0].conversation).toHaveLength(1);

                    expect(messageList[0].conversation[0].type).toEqual(message.type);
                    expect(messageList[0].conversation[0].value).toEqual(message.value);
                    expect(messageList[0].conversation[0].userExtId).toEqual(message.userExtId);
                    expect(messageList[0].conversation[0].status).toBeDefined();

                })
                .expect(200, done);

        })
    })
});
