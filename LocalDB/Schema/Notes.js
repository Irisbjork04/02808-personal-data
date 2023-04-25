const notesSchema = {
    keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'human schema with composite primary',
    primaryKey: {
        key: 'id',
        fields: [
            'userId',
            'dateTime'
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
            type: 'string'
        },
        dateTime: {
            type: 'string'
        },
        note: {
            type: 'string'
        }
    },
    required: [
      'id', 
      'userId',
      'dateTime'
    ]
  };

  export default notesSchema;