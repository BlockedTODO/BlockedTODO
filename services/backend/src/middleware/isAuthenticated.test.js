const isAuthenticated = require('./isAuthenticated');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

const user = {
    id: 'abc123',
    email: 'test@test.com',
};
const validAuthenticationObject = {
    isAuthenticated: true,
    userId: user.id,
};
const invalidAuthenticationObject = {isAuthenticated: false};

const generateValidRequest = (user) => {
    const token = jwt.sign({userId: user.id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: `1h`});
    return httpMocks.createRequest({
        headers: {Authorization: `Bearer ${token}`}
    })
};
const nextMock = jest.fn();

beforeEach(() => {
    req = generateValidRequest(user);
    res = httpMocks.createResponse();
});

describe('isAuthenticated', () => {
    it('calls next', () => {
        isAuthenticated(req, res, nextMock);
        expect(nextMock).toHaveBeenCalledTimes(1);
    });

    it('calls next when authentication is invalid', () => {
        req = httpMocks.createRequest();
        isAuthenticated(req, res, nextMock);
        expect(nextMock).toHaveBeenCalledTimes(1);
    });

    it('adds authentication key to request object', () => {
        isAuthenticated(req, res, nextMock);
        expect(req).toHaveProperty('authentication');
    });

    it('populates authentication object with userId and isAuthenticated', () => {
        isAuthenticated(req, res, nextMock);
        expect(req).toMatchObject({authentication: validAuthenticationObject});
    });

    it('does not populate authentication object with userId when authentication is invalid', () => {
        req = httpMocks.createRequest();
        isAuthenticated(req, res, nextMock);
        expect(req.authentication).not.toHaveProperty('userId');
    });

    it('sets isAuthenticated to false when Authorization header is missing', () => {
        req = httpMocks.createRequest();
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header does not contain the token', () => {
        req = httpMocks.createRequest({
            headers: {Authorization: `Bearer `}
        });
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header does not contain the word Bearer', () => {
        req.headers.authorization = req.headers.authorization.split(' ')[1];
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header contains an empty string', () => {
        req.headers.authorization = '';
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false and calls next when jwt.verify raises an error', () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {throw new Error();});
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
        expect(nextMock).toHaveBeenCalledTimes(1);
    });

    it('sets isAuthenticated to false next when jwt.verify returns undefined', () => {
        jest.spyOn(jwt, 'verify').mockReturnValue(undefined);
        isAuthenticated(req, res, nextMock);
        expect(req.authentication.isAuthenticated).toBe(false);
    });
});
