const Items = require('./model.js');

const myModules = {
  importData: async (items) => {
    try {
      console.log('hii');
      await Items.create(items);
      console.log("Data Loaded");
    } catch (err) {
      console.log(err);
    }
  },
  deleteData: async () => {
    try {
      await Items.deleteMany();
      console.log("Data Deleted");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = myModules;