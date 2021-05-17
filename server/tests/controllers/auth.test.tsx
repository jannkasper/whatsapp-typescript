import request from 'supertest';
import {beforeEach, describe, expect, test} from "@jest/globals";
import {TestError} from "@jest/types/build/Circus";
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {UserTest, validUser} from '../factories';
import User from '../../src/models/user'
import app from '../../src/app';

interface CustomJwtPayload extends JwtPayload {
    username: string;
}

describe('Authorization endpoints', () => {
    let user: UserTest;
    const username = {
        nonExisting: 'new',
        invalid: 'user!$@',
        long: 'a'.repeat(33),
        blank: ''
    };
    const phoneNumber = {
        nonExisting: 'new',
        invalid: 'user!$@',
        long: 'a'.repeat(33),
        blank: ''
    };
    const password = {
        wrong: 'incorrect',
        short: 'aaa',
        long: 'a'.repeat(73),
        blank: ''
    };

    beforeEach(async () => {
        user = validUser();
        await new User({...user}).save();
    })

    describe('/signup', () => {
        test('reject with with missing fields', (done) => {
            request(app)
                .post('/api/signup')
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    res.body.errors.forEach((err: TestError) => {
                        expect(err.msg).toContain('required');
                    })
                })
                .expect(422, done);
        });

        test('reject with blank name', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, username: username.blank})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('cannot be blank');
                })
                .expect(422, done);
        });

        test('reject with invalid name', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, username: username.invalid})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('invalid');
                })
                .expect(422, done);
        });

        test('reject with too long name', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, username: username.long})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('must be at most 16 characters long');
                })
                .expect(422, done);
        });

        test('reject with existing username', (done) => {
            request(app)
                .post('/api/signup')
                .send(user)
                .expect((res) => {
                    expect(res.body.message).toBeDefined();
                    expect(res.body.message).toContain('Username already exists.');
                })
                .expect(400, done);
        });

        test('reject with blank password', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, password: password.blank})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('cannot be blank');
                })
                .expect(422, done);
        });

        test('reject with too short password', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, password: password.short})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('must be at least 6 characters long');
                })
                .expect(422, done);
        });

        test('reject with too long password', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, password: password.long})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('must be at most 50 characters long');
                })
                .expect(422, done);
        });

        test('reject with blank phone number', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, phoneNumber: phoneNumber.blank})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('cannot be blank');
                })
                .expect(422, done);
        });

        test('reject with too long phone number', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, phoneNumber: phoneNumber.long})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('must be between 6 and 12 characters long');
                })
                .expect(422, done);
        });

        test('reject with invalid phone number', (done) => {
            request(app)
                .post('/api/signup')
                .send({...user, phoneNumber: phoneNumber.invalid})
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('invalid');
                })
                .expect(422, done);
        });

        test('creates a new user and returns a valid auth token', (done) => {
            request(app)
                .post('/api/signup')
                .send({ ...user, username: username.nonExisting })
                .expect('Content-Type', /json/)
                .expect((res) => {
                    const { token } = res.body;
                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    expect(decodedToken.username).toEqual(username.nonExisting);
                })
                .expect(200, done);
        });
    });

    describe('/authenticate', () => {
        test('rejects requests with no credentials', (done) => {
            request(app)
                .post('/api/authenticate')
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    res.body.errors.forEach((err: TestError) => {
                        expect(err.msg).toContain('required');
                    })
                })
                .expect(422, done)
        });

        test('reject requests with blank name', (done) => {
            request(app)
                .post('/api/authenticate')
                .send({...user, username: username.blank })
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('cannot be blank');
                })
                .expect(422, done)
        });

        test('reject requests with invalid name', (done) => {
            request(app)
                .post('/api/authenticate')
                .send({...user, username: username.invalid })
                .expect((res) => {
                    expect(res.body.errors).toBeDefined();
                    expect(res.body.errors[0].msg).toContain('invalid');
                })
                .expect(422, done)
        });

        test('reject requests with incorrect name', (done) => {
            request(app)
                .post('/api/authenticate')
                .send({...user, username: username.nonExisting })
                .expect((res) => {
                    expect(res.body.message).toContain('Username doesn\'t exists.');
                })
                .expect(403, done)
        });

        test('reject requests with incorrect password', (done) => {
            request(app)
                .post('/api/authenticate')
                .send({ ...user, password: password.wrong })
                .expect((res) => {
                    expect(res.body.message).toContain('Wrong password.');
                })
                .expect(403, done);
        });

        test('returns a valid auth token', (done) => {
            request(app)
                .post('/api/authenticate')
                .send(user)
                .expect('Content-Type', /json/)
                .expect((res) => {
                    const { token } = res.body;
                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    expect(decodedToken.username).toEqual(user.username);
                })
                .expect(200, done);
        })
    })
});
