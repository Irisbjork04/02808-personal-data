const tinitusSchema = {
    keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'Tinitus Tracking Schema',
    primaryKey: {
        key: 'id',  // where should the composed string be stored
        fields: [   // fields that will be used to create the composed key
            'userId',
            'dateTime'
        ],
        separator: '|' // separator which is used to concat the fields values.
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        userId: {
            "type": "string"
        },
        dateTime: {
            type: 'string',
            maxLength: 40 
        },
        notes: {
            type: 'string',
        }
    },
    required: [
      'id', 
      'userId',
      'dateTime'
    ]
  };

export default tinitusSchema;