import shortId from "shortid";
import faker from "faker";

export type UserTest = {
    externalIdentifier: string,
    username: string,
    phoneNumber: number,
    password: string
}

export type MessageTest = {
    type: string,
    value: string,
    userExtId: string,
    receiverExtId: string,
    created: number
}

export const validUser = (): UserTest => ({
    externalIdentifier: shortId.generate(),
    username: faker.name.firstName().toLowerCase(),
    phoneNumber: Math.floor(Math.random() * 1000000000),
    password: 'password',
});

export const validMessage = (userExtId: string, receiverExtId: string) => ({
    type: 'text',
    value: faker.lorem.sentence(),
    userExtId,
    receiverExtId,
    created: Date.now()
});
