import { addRxPlugin, createRxDatabase } from 'rxdb';
import fetch from 'cross-fetch';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import {
    STORAGE
} from './Storage';
import TinitusSchema from './Schema/Tinitus';
import NotesSchema from './Schema/Notes';
import SleepSchema from './Schema/Sleep';
import { tinitusSeed } from './seed/Tinitus'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'

addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBMigrationPlugin)
addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin); // for Devloment only

const dbName = 'health-track';
const syncURL = 'http://admin:strongpassword@localhost:5984'; // Replace with your couchdb instance
export const TinitusCollectionName = 'tinitus';
export const SleepTimeCollectionName = 'sleeptime';
export const NotesCollectionName = 'notes';

const initialize = async (withSeed = false) => {
    let db;

    try {
        console.log("Initializing DB with Seed:"+ withSeed);

        db = await createRxDatabase({
            name: dbName,
            storage: STORAGE,
            multiInstance: true,
            ignoreDuplicate: true,
        });

        console.log("DB Initialized");
    } catch (err) {
        console.log('ERROR CREATING DATABASE', err);
    }

    try {
        console.log('Adding All collection...');
        await db.addCollections({
            [TinitusCollectionName]: {
                schema: TinitusSchema,
            },
            [SleepTimeCollectionName]: {
                schema: SleepSchema,
            },
            [NotesCollectionName]: {
                schema: NotesSchema,
            },
        });
        console.log('Collection added!');
    } catch (err) {
        console.log('ERROR CREATING COLLECTION', err);
    }


    try {
        console.log('Start sync...');
        const replicationState = replicateCouchDB({
            collection: db[TinitusCollectionName],
            url: `${syncURL}/${TinitusCollectionName}/`,
            fetch: fetch,
            pull: {},
            push: {}
        });

        console.dir(replicationState);

        replicationState.active$.subscribe((v) => {
            console.log('Replication active$:', v)
        })
        replicationState.canceled$.subscribe((v) => {
            console.log('Replication canceled$:', v)
        })
        replicationState.error$.subscribe(async error => {
            console.error('Replication error$:',error)
        })

        const replicationSleepState = replicateCouchDB({
            collection: db[SleepTimeCollectionName],
            url: `${syncURL}/${SleepTimeCollectionName}/`,
            fetch: fetch,
            pull: {},
            push: {}
        });
    } catch (err) {
        console.log('Error initialize sync', err);
    }

    if(withSeed) {
        await addSeedData(db);
    }

    return db;
}


const addSeedData = async (db) => {
    if(! await db[TinitusCollectionName].findOne().exec()) { // DB is empty
        for (const data of tinitusSeed) {
            await db[TinitusCollectionName].insert(data);
        }
        console.log("Added tinitus Seed Data count:"+ tinitusSeed.length);
    }
}
export default initialize;