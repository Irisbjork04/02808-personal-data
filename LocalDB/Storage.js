/**
 * The storage is defined in a separate file
 * so that it can be swapped out in the CI to test
 * different storages.
 */
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';


// import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
// export const STORAGE = wrappedKeyCompressionStorage({
//     storage: getRxStorageMemory()
// }); 


// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
// export const STORAGE = getRxStorageDexie();


// https://rxdb.info/rx-storage-lokijs.html
import { getRxStorageLoki } from 'rxdb/plugins/storage-lokijs';

// const LokiIncrementalIndexedDBAdapter = require('lokijs/src/incremental-indexeddb-adapter');
export const STORAGE =wrappedKeyCompressionStorage({
    storage: getRxStorageLoki({
        // adapter: new LokiIncrementalIndexedDBAdapter(),
        /* 
         * Do not set lokiJS persistence options like autoload and autosave,
         * RxDB will pick proper defaults based on the given adapter
         */
    })
});



// import { getRxStoragePouch, addPouchPlugin } from 'rxdb/plugins/pouchdb';
// addPouchPlugin(require('pouchdb-adapter-asyncstorage'));
// export const STORAGE = wrappedKeyCompressionStorage({
//     storage: getRxStoragePouch(
//         'node-asyncstorage',
//         {
//             /**
//              * other pouchdb specific options
//              * @link https://pouchdb.com/api.html#create_database
//              */
//         }
//     )
// });