# Setup Database
## Local dadabase
Setup process described for ubuntu, for another operation system it might be diferent. 
- First you need to install postgress and start it with command `sudo service postgresql start`
- Then check the folder of your postgress database: sign in in console `psql -U <username> -h 127.0.0.1 -p 5432` default username and password is `postgres`. Then check folder with command `SHOW data_directory;`
(If password is not correct you can reset it with this commands: `user:~$ sudo -i -u postgres postgres` and then `postgres@user:~$ psql` after that execute query `postgres=# ALTER USER postgres PASSWORD 'mynewpassword';`)
- Open file `sudo gedit /etc/postgresql/<your version>/main/postgresql.conf` and after the string `#listen_addresses = 'localhost'` add line `listen_addresses = '*'`
- Open the file `sudo gedit /etc/postgresql/<your version>/main/pg_hba.conf` and add the lines: `host  all  all 0.0.0.0/0 scram-sha-256`, `host    all             all             172.17.0.0/16            md5` and `host    all             all             172.22.0.2/32           md5`  (make sure your docker container runing on one of this adresses, if no then change them). 

Now you should be able to connect to local DB from docker container.

Install this extensions to run project from VS code:
`ms-python.python`
`ms-azuretools.vscode-docker`
# market
Things to mention:
- project is using Cron to update update_post_officess.py

