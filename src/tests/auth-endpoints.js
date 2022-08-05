const SequelizeMock = require('sequelize-mock');

const { login } = require('../controllers/auth');
var sinon = require('sinon');
const DBConnectionMock = new SequelizeMock();
const { User } = require('../models');

// sequelize.$overrideImport('./users/model.js', './users/mock.js');

const UserMock = DBConnectionMock.define(
  'User',
  {
    id: '3c9d7415-16de-4066-b910-594c87b29b5e',
    active: false,
    email: 'josh.smith@optimumparners.co',
    password: 'password',
  },
  {
    instanceMethods: {
      myTestFunc: function () {
        return 'Test User';
      },
    },
  },
);

describe('unit testing /auth/login route', function () {
  it('login controller', async function () {
    const save = sinon.stub(User);
    let results,
        mockRequest = {
          body: {
            email: 'josh.smith@optimumparners.co',
            password: 'password',
          },
        };
    await login(mockRequest, res => results = res);
    sinon.assert.calledWith(save, UserMock);
    save.restore();
    expect(result).toHaveProperty('id');
  });

  // const loginFn = jest.fn(async (mockRequest, mockResponse) => {
  //   const { email, password, fullname } = mockRequest;
  //   try {
  //     const { dataValues } = await UserMock.findOne({ where: { email } });
  //     if (dataValues.password != password) {
  //       return { error: 'Invalid email or password' };
  //     }
  //     return (mockResponse = dataValues);
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // });

  // test('testing with a dummy json', async () => {
  //   const result = await login(
  //     {
  //       email: 'josh.smith@optimumparners.co',
  //       password: 'password',
  //     },
  //     (...args) => args,
  //   );
  //   jest.spyOn('login', 'User').mockImplementation(args => {
  //     console.log(args);
  //   });
  //   expect(result).toHaveProperty('id');
  // });

  //   test('testing with a dummy json', async () => {
  //     const result = await loginFn({
  //       email: 'josh.smith@optimumparners.co',
  //       password: 'password1',
  //     });
  //     expect(result).toHaveProperty('error', 'Invalid email or password');
  //   });
});
