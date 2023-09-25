import userData from '../../data/users.json' assert { type: 'json' };
import NotFoundError from '../../errors/NotFoundError.js';

const updateUserById = (id, username, password) => {
  const user = userData.users.find((user) => user.id === id);

  if (!user) {
    throw new NotFoundError('User', id);
  }

  user.username = username ?? user.username;
  user.password = password ?? user.password;

  return user;
};

export default updateUserById;
