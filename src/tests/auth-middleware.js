const request = require('supertest');
const authorizationMiddleware = require('../middleware/auth');
const { generateAccessToken } = require('../utils');

describe('Authorization middleware', () => {
  class NoErrorThrownError extends Error {}
  const getError = async call => {
    try {
      await call();

      throw new NoErrorThrownError();
    } catch (error) {
      return error;
    }
  };

  let mockRequest,
    mockResponse,
    nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test('without authorization headers', async () => {
    const error = await getError(async () =>
      authorizationMiddleware(mockRequest, mockResponse, nextFunction),
    );

    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('statusCode', 401);
    expect(error).toHaveProperty('message', 'Authorization header required!');
  });

  test('with "authorization" header', async () => {
    mockUser = {
      id: '3c9d7415-16de-4066-b910-594c87b29b5e',
    //   email: 'test.optimumpartners.co',
    //   password: 'password',
    };
    const token = generateAccessToken(mockUser);
    mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    authorizationMiddleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});

// describe('Auth Endpoints', () => {
//   beforeEach(function () {
//     auth = require('../middleware/auth');
//     sinon.stub(auth, 'isAuthenticated').callsFake(function (req, res, next) {
//       return next();
//     });

//     // after you can create app:
//     app = require('../../wherever/index');
//   });

//   afterEach(function () {
//     // restore original method
//     auth.isAuthenticated.restore();
//   });

//   it('it should return a 200 response', function (done) {
//     request(app)
//       .post('/subscriptions/sync')
//       .set('Authorization', 'Bearer ' + authToken)
//       .send({ receipt: newSubscriptionReceipt })
//       .expect(200, done);
//   });

//   it('registration', async () => {
//     const res = await request(app).post('/auth/register').send({
//       fullname: 'ASdf Asd',
//       email: 'asd.dfg@optimumpartners.co',
//       password: 'P@ss222',
//     });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('post');
//   });
// });
