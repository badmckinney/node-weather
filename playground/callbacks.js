var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Brad'
  };
  callback();
};

getUser(1, (user) => {
  console.log(user);
});
