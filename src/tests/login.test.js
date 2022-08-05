const sinon = require('sinon');

const { User } = require('../models');
const { login } = require('../controllers/auth');
const SequelizeMock = require('sequelize-mock');
const db = require('../models')

// const jest = require('jest');

// const bluebird = require('bluebird');
const DBConnectionMock = new SequelizeMock();

jest.mock('../models');

const user = db['user']

const UserMock = DBConnectionMock.define(
  'User',
  {
    id: '3c9d7415-16de-4066-b910-594c87b29b5e',
    active: false,
    email: 'josh.smith@optimumparners.co',
    password: 'asdh49!@Ef',
  },
  {
    instanceMethods: {
      myTestFunc: function () {
        return 'Test User';
      },
    },
  },
);

describe('Users Controller', () => {
  // const user = {};
  describe('LOgin User', () => {
    jest.mock('../models/user');
    const DBConnectionMock = new SequelizeMock();

    const UserMock = DBConnectionMock.define(
      'User',
      {
        id: '3c9d7415-16de-4066-b910-594c87b29b5e',
        active: false,
        email: 'josh.smith@optimumparners.co',
        password: 'asdh49!@Ef',
      },
      {
        instanceMethods: {
          myTestFunc: function () {
            return 'Test User';
          },
        },
      },
    );
    // beforeEach(() => {
    //   user.mockClear();
    // });
      console.log(11111111111, user)
    it('should find the user and send a token', async () => {
      // let response;
      // await login(
      //   {
      //     body: {
      //       email: 'josh.smith@optimumparners.co',
      //       password: 'password',
      //       email: 'josh.smith@optimumparners.co',
      //       password: 'asdh49!@Ef',
      //     },
      //   },
      //   res => (response = res),
      // );
      // const mockUserCreate = UserMock.findOne;
      // expect(mockUserCreate).toHaveBeenCalledTimes(1);

      const findUserMock = jest.spyOn(user.prototype, 'findOne').mockImplementation(() => {
        return UserMock.findOne;
      });

      const mockObj = new user();
      const foundUser = await user.findOne({
        where: { email: 'josh.smith@optimumparners.co'.toLowerCase() },
      });
      expect(findUserMock).toHaveBeenCalled();

      // jest.mock('../models/user', () => {
      //   return jest.fn().mockImplementation(() => {
      //     return { UserMock };
      //   });
      // });

      // await login();

      // expect(foundUser).toHaveBeenCalledTimes(1);
      // const somethingSpy = jest.spyOn(login, 'User.findOne');
      // let response;
      // await login(
      //   {
      //     body: {
      //       email: 'josh.smith@optimumparners.co',
      //       password: 'password',
      //       email: 'josh.smith@optimumparners.co',
      //       password: 'asdh49!@Ef',
      //     },
      //   },
      //   res => (response = res),
      // );
      // expect(somethingSpy).toBeCalled();

      // sinon.stub(User, 'findOne').callsFake(UserMock.findOne);
      // let resSpy = sinon.spy();
      // const req = {
      //   body: {
      // email: 'josh.smith@optimumparners.co',
      // password: 'password',
      //     email: 'josh.smith@optimumparners.co',
      //     password: 'asdh49!@Ef',
      //   },
      // };
      // const res = {
      //   status: sinon.stub().returns({ send: resSpy }),
      // };

      // await login(req, res);

      // expect(getUserStub.calledOnce).to.equal(true);
      // expect(resSpy.calledOnce).to.equal(true);
      // expect(resSpy.calledWith(user)).to.equal(true);

      // getUserStub.restore();
    });
  });
});
