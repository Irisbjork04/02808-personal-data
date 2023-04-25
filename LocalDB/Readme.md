
## CouchDB Replication
## Up and Run a couchdb in your pc. I have cxreated a [docker-compose](../docker/docker-compose.yml) file for this purpose. 

1. If you do not have docker desktop install, then you need to install it. (https://docs.docker.com/desktop/install/windows-install/)
2. Run below command (this will create a Couch DB with user:`admin` and password:`strongpassword`)
```bash
# Go to docker directory
cd docker
docker compose up -d
```
3. If it is your first time running above command, then you need to go to this url (http://127.0.0.1:5984/_utils#setup) from your browser 
- add create a single node server.
- Go to this URL (http://127.0.0.1:5984/_utils/#_config), select CORS and then enable CORS
- Go to this URL (http://127.0.0.1:5984/_utils/#/_all_dbs), and create below databases
    - tinitus
    - sleeptime
    


### Add CORS on CouchDB server ([Link](https://pouchdb.com/errors.html))
```bash
npm install -g add-cors-to-couchdb
add-cors-to-couchdb http://127.0.0.1:5984 -u admin -p strongpassword
```
