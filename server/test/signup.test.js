import { describe } from "node:test";
import { validateSignup, signup } from "../controllers/auth.js";
import { ValidationError, validationResult } from 'express-validator';

describe('Signup functionality', () => {
    test('should validate signup data', () => {
        const req = {
            body: {
                email: 'febinachu123@gmail.com',
                password: '12345'
            }
        };

        const res = {
            status: jest.fn((() => res)),
            json: jest.fn(),
        }

        validateSignup[0](req, res, () => { });
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    test('should handle signup and send verification email', async () => {
        const req = {
            body: {
                email: 'febinachu123@gmail.com',
                password: '12345',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        // Check if the response contains a token and user
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.objectContaining({
                email: 'febinachu123@gmail.com',
                password: "12345"
            }),
        }));
    });
});