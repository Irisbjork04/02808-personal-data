const sleepSchema = {
    keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'human schema with composite primary',
    primaryKey: {
        key: 'id',
        fields: [
            'userId',
            'startDateTime'
        ],
        separator: '|'
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 
        },
        userId: {
            type: 'number'
        },
        startDateTime: {
            type: 'string'
        },
        endDateTime: {
            type: 'string'
        }
    },
    required: [
      'id', 
      'userId',
      'startDateTime',
      'endDateTime'
    ]
  };

  export default sleepSchema;