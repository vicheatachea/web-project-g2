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
        
    }
}