// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;
    // Throw an error if no text in data
    if (!data.text) {
      throw new Error('A message must have a text.');
    }

    // The authenticated user
    const user = context.params.user;
    // The actual message text
    const text = context.data.text
      // Messages cannot be longer than 400 characters
      // This number is arbitrary and can be varied.
      .substring(0, 400);

    // Override the original data so people cannot update
    // additional stuff.
    context.data = {
      text,
      // Set the user id
      userId: user._id,
      createdAt: new Date().getTime(),
    };

    return context;
  };
};
