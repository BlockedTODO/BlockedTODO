const isAuthenticated = require('./isAuthenticated');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const {transactionPerTest} = require('objection-transactional-tests');
const {db, User} = require('db/');

const generateValidRequest = (user) => {
    const token = jwt.sign({userId: user.id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
    return httpMocks.createRequest({
        headers: {Authorization: `Bearer ${token}`}
    });
};

beforeAll(() => {
    transactionPerTest();
});

afterAll(() => {
    db.destroy();
});

let user, req, res, next;
beforeEach(async () => {
    user = await User.query().findOne({});
    req = generateValidRequest(user);
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('isAuthenticated', () => {
    it('calls next', async () => {
        await isAuthenticated(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('calls next when authentication is invalid', async () => {
        req = httpMocks.createRequest();
        await isAuthenticated(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('adds authentication key to request object', async () => {
        await isAuthenticated(req, res, next);
        expect(req).toHaveProperty('authentication');
    });

    it('populates authentication object with userId and isAuthenticated', async () => {
        const validAuthenticationObject = {
            isAuthenticated: true,
            user: user,
        };
        await isAuthenticated(req, res, next);
        expect(req).toMatchObject({authentication: validAuthenticationObject});
    });

    it('does not populate authentication object with userId when authentication is invalid', async () => {
        req = httpMocks.createRequest();
        await isAuthenticated(req, res, next);
        expect(req.authentication).not.toHaveProperty('userId');
    });

    it('sets isAuthenticated to false when Authorization header is missing', async () => {
        req = httpMocks.createRequest();
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header does not contain the token', async () => {
        req = httpMocks.createRequest({
            headers: {Authorization: 'Bearer '}
        });
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header does not contain the word Bearer', async () => {
        req.headers.authorization = req.headers.authorization.split(' ')[1];
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false when Authorization header contains an empty string', async () => {
        req.headers.authorization = '';
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
    });

    it('sets isAuthenticated to false and calls next when jwt.verify raises an error', async () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {throw new Error();});
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('sets isAuthenticated to false next when jwt.verify returns undefined', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue(undefined);
        await isAuthenticated(req, res, next);
        expect(req.authentication.isAuthenticated).toBe(false);
    });
});
