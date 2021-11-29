# Setup Database
## Local dadabase
Setup process described for ubuntu, for another operation system it might be diferent. 
- First you need to install postgress and start it with command `sudo service postgresql restart `
- Then check the folder of your postgress database: sign in in console `psql -U <username> -h 127.0.0.1 -p 5432` default username and password is `postgres`. Then check folder with command `SHOW data_directory;`
- Open file `sudo gedit /etc/postgresql/<your version>/main/postgresql.conf` and after the string `#listen_addresses = 'localhost'` add line `listen_addresses = '*'`
- Open the file `sudo gedit /etc/postgresql/<your version>/main/pg_hba.conf` and add the lines: `host    all             all             172.17.0.0/16            md5` and `host    all             all             172.22.0.2/32           md5` (make sure your docker container runing on one of this adresses, if no then change them). 

Now you should be able to connect to local DB from docker container.
# market
Things to mention:
- project is using Cron to update update_post_officess.py

