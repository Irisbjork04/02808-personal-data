const userSchema = {
    keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'user collection',
    primaryKey: "email",
    type: 'object',
    properties: {
        email: {
            type: 'string',
            "maxLength": 100
        },
        name: {
            type: 'string'
        },
        password: {
            type: 'string',
            "maxLength": 20
        }
    },
    required: [
      'email'
    ]
  };

  export default userSchema;