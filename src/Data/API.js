import axios from "axios";

const UsersDataBaseAPI = {
  users: axios.create({
    baseURL:
      "https://pokemon-game-9babb-default-rtdb.europe-west1.firebasedatabase.app/users",
  }),

  async removeUser(key) {
    this.users
      .delete(`/${key}.json`)
      .then((response) => {
        console.log(`user id ${key} was deleted seccesfully`);
        return "User Was Deleted!";
      })
      .catch((error) => {
        return "Error while deleting user";
      });
  },

  async getAllUsers() {
    try {
      const response = await this.users.get(".json");
      if (response.status !== 200) {
        console.error("cant get user from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting user", error);
    }
  },

  async addUser(newUser) {
    this.users
      .post(".json", newUser)
      .then((response) => {
        console.log("User added successfully");
        localStorage.setItem('addedKey', JSON.stringify(response.data.name))
      })
      .catch((error) => {
        console.error("Error adding user", error);
      });
  },

  async editUser(updatedData, id) {
    this.users
      .put(`/${id}.json`, updatedData)
      .then((response) => {
        console.log("User updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  },

  getKeys(users) {
    const keys = Object.keys(users);
    const newKeys = [];
    for (let i = 0; i < keys.length; i++) {
      if (users[keys[i]] !== null) {
        newKeys.push(keys[i]);
      }
    }
    return newKeys;
  },
};

export default UsersDataBaseAPI;
