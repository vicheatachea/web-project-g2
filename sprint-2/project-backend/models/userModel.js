let userArray = [];

let nextId = 1;

function getAll() {
  return userArray;
}

function addOne(userData) {
    
    const {username, email, password} = userData;
    if (!username || !email || !password) {
        return false;
    }

    const newUser = {
        id: nextId++,
        ...userData,
    };

    userArray.push(newUser);
    return newUser;
}

function findById(id) {
    const userId = Number(id);
    const user = userArray.find((user) => user.id == userId);
    return item || false;
}

function updateOneById(id, updatedData) {
    const user = findById(id);
    if (user) {
        Object.assign(user, updatedData);
        return user;
    }
    return false;
}

function deleteOneById(id) {
    const item = findById(id);
    if (item) {
        const initialLength = userArray.length;
        userArray = userArray.filter((user) => user.id != Number(id));
        return userArray.length < initialLength;
    }
    return false;
}

module.exports = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
}

module.exports = User;