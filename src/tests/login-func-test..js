const SequelizeMock = require('sequelize-mock');

const DBConnectionMock = new SequelizeMock();

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
/*
// You can also associate mock models as well
const GroupMock = DBConnectionMock.define('groups', {
  name: 'My Awesome Group',
});

UserMock.belongsTo(GroupMock);

// From there we can start using it like a normal model
UserMock.findOne({
  where: {
    username: 'my-user',
  },
}).then(function (user) {
  // `user` is a Sequelize Model-like object
  user.get('id'); // Auto-Incrementing ID available on all Models
  user.get('email'); // 'email@example.com'; Pulled from default values
  user.get('username'); // 'my-user'; Pulled from the `where` in the query

  user.myTestFunc(); // Will return 'Test User' as defined above

  user.getGroup(); // Will return a `GroupMock` object
});
*/

// /login

describe('unit testing /auth/login route', function () {

  const loginFn = jest.fn(async (mockRequest, mockResponse) => {
    const { email, password, fullname } = mockRequest;
    try {
      const { dataValues } = await UserMock.findOne({ where: { email } });
      if (dataValues.password != password) {
        return { error: 'Invalid email or password' };
      }
      return (mockResponse = dataValues);
    } catch (error) {
      return { error: error.message };
    }
  });

  test('testing with a dummy json', async () => {
    const result = await loginFn({
      email: 'josh.smith@optimumparners.co',
      password: 'password',
    });
    expect(result).toHaveProperty('id');
  });

  test('testing with a dummy json', async () => {
    const result = await loginFn({
      email: 'josh.smith@optimumparners.co',
      password: 'password1',
    });
    expect(result).toHaveProperty('error', 'Invalid email or password');
  });
});
