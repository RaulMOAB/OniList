## Introduction to Onilist Club

We are glad to introduce you our final project of Web Development Applications grade.

This web application is based on React + Nextjs 13 and Laravel 9 using MySQL for database ang Grapql to populates our database.

## Project frontend structure

- fonts directory: contain all the fonts our web applications uses.
- public directory: Contains all public data like images, gifs, avatars and icons.
- src directory: this is our main code where all components and resources are located.
- src/animations: any animation is placed here.
- src/components: all components used to build this application.
- src/contexts: some contexts to easily data access through components is placed here.
- src/layouts: layouts from some views are here.
- src/pages: all of web application pages are contained in this folder
- src/styles: css files to style our web application

## Project backend structure

-app/Http/Controllers: contains all controller that allows us to group the logic of related HTTP requests.
-app/Models: contains all classes that represent all tables from our database
-app/Mail: contain a class Mailable that help us to send emails to the user.
-config/jwt.php: file configuration for json web token.
-database: this directory has the migration, seeder and factories directories, we usual have used the migrations directory to make the structure of our database tables.
-public/storage/: is symbolically linked to storage directory which contains the images of the banners and avatars of the registered users.
-routes/api.php: file for set the /api routes of our backend.
-init.php: script for get all necessary data for our web aplication.
-startup.config.json: for deploy Laravel with PM2

## How to complided it

First, run the Nextjs development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Secondly, run Laravel with the following command

Get the code here [Onilist Laravel API](https://github.com/RaulMOAB/OniList-Laravel-API)

```bash
# to install all libraries and dependeces
composer install

# generates jwt token locatet to .env
php artisan jwt:secret
 
# generates a key application 
php artisan key:generate

# run all migrations
php artisan migrate:fresh --seed

# run Laravel
php artisan serve
```
## Import SQL

- Open yout terminal where onilist.sql is located and put this command

```bash
mysql -u root -p onilist < onilist.sql
```
## Deployment

- git pull of both projects [Onilist](https://github.com/RaulMOAB/OniList) and [Onilist Laravel API](https://github.com/RaulMOAB/OniList-Laravel-API)

### Nextjs build steps
```bash
# to install all libraries and dependeces
npm install

# Nextj buiild
npm run build

# Start Nextjs at port 3000
pm2 start npm --name onilist-app -- run start -- -p 3000 
```

### Import database
```bash
mysql -u root -p onilist < onilist.sql
```

### Laravel build
```bash
# to install all libraries and dependeces
composer install

# generates jwt token locatet to .env
php artisan jwt:secret
 
# generates a key application 
php artisan key:generate

# run all migrations
php artisan migrate:fresh --seed

# start Laravel at port 80000
pm2 start startup.config.js
```

### Nginx configuration

```bash
server{
        server_name onilist.club www.onilist.club;

        location /{
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
        # Laravel API settings
    location /api {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    }
}
```


