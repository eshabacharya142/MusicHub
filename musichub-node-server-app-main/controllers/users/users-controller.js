import * as userDao from './users-dao.js';

let currentUser = null;

const UsersController = (app) => {

  //find all users
  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
  };

  //create new user
  const createUser = async (req, res) => {
    const newUser = req.body;
    const actualUser = await createUserHelper(newUser);
    res.json(actualUser);
  };

  //create user helper
  const createUserHelper = async (newUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        let actualUser = null;
        if (newUser.role === 'ADMIN') {
          actualUser = await userDao.createAdminUser(newUser);
        } else if (newUser.role === 'MUSIC-CREATOR') {
          actualUser = await userDao.createCreatorUser(newUser);
        } else {
          actualUser = await userDao.createUser(newUser);
        }
        return resolve(actualUser);
      } catch (e) {
        return reject(e);
      }
    });
  };

  //update existing user
  const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updates = req.body;
    const status = await updateUserHelper(updates, userIdToUpdate);
    res.json(status);
  };

  //update helper
  const updateUserHelper = async (updates, userIdToUpdate) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;
        if (updates.role === 'MUSIC-CREATOR') {
          status = await userDao.updateCreatorUser(userIdToUpdate, updates);
        } else {
          status = await userDao.updateUser(userIdToUpdate, updates);
        }
        return resolve(status);
      } catch (e) {
        return reject(e);
      }
    });
  };

  //delete existing user
  const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const userToDelete = userDao.findUserById(userIdToDelete);
    const status = await deleteUserHelper(userIdToDelete, userToDelete);
    res.json(status);
  };

  //delete user helper
  const deleteUserHelper = async (userIdToDelete, userToDelete) => {
    return new Promise(async (resolve, reject) => {
      try {
        let status;
        if (userToDelete.role === 'MUSIC-CREATOR') {
          status = await userDao.deleteCreatorUser(userIdToDelete);
        } else {
          status = await userDao.deleteUser(userIdToDelete);
        }
        return resolve(status);
      } catch (e) {
        return reject(e);
      }
    });
  };

  //auth-register user
  const register = async (req, res) => {
    try {
      const user = req.body;
      const existingUser = await userDao.findUserByUsername(user.username);
      if (existingUser) {
        res.sendStatus(403);
        return;
      }
      const currentUser = await createUserHelper(user);
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    } catch (e) {
      res.status(400).json(e);
    }
    return;
  };

  //auth-login user
  const login = async (req, res) => {
    const credentials = req.body;
    const existingUser = await userDao.findUserByCredentials(
      credentials.username,
      credentials.password
    );
    if (existingUser) {
      req.session['currentUser'] = existingUser;
      res.json(existingUser);
      return;
    }
    res.sendStatus(403);
  };

  //auth-logout user
  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  //auth-retrieve user profile
  const profile = (req, res) => {
    if (req.session['currentUser']) {
      res.send(req.session['currentUser']);
    } else {
      res.sendStatus(403);
    }
  };

  //auth-update user profile
  const updateProfile = async (req, res) => {
    const newProfile = req.body;
    req.session['currentUser'] = newProfile;
    const status = await updateUserHelper(newProfile);
    res.json(newProfile);
  };

  //find user by id
  const findUserById = async (req, res) => {
    const uid = req.params.uid;
    const user = await userDao.findUserById(uid);
    if (user) {
      res.json(user);
      return;
    }
    res.sendStatus(404);
  };

  //API urls
  app.get('/users', findAllUsers);
  app.get('/users/:uid', findUserById);
  app.post('/users', createUser);
  app.put('/users/:uid', updateUser);
  app.delete('/users/:uid', deleteUser);

  app.post('/register', register);
  app.post('/login', login);
  app.post('/logout', logout);

  app.post('/profile/update', updateProfile);
  app.post('/profile', profile);
};

export default UsersController;
