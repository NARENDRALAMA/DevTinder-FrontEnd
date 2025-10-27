# DevTinder

-Created a Vite + React application
-Remove unecessary code and create a Hello world app. Fot that i deleted the all the imports and all the codes form the app.jsx. I also deleted the App.css and the assets folder which contains my images of the default projet.
-Install Tailwind CSS
-Install DaisyUI
-Add NavBar component to App.jsx
-Create a NavBar.jsx seperate Component file
-Install a Login Page
-CORS - install cors in backend=> add middleware to with configurations: origin , credentials: true
-Wherenver you're making API call so pass axios=> { withCredentials: true}
-Install Redux Toolkit - https://redux.js.org/tutorials/quick-start
-install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlider => add reducer to store
-Add redux devtools in chrome
-Login and see if your data is coming properly in the store
-NavBar should update as soon as user logs in
-Refactor our code to add constants file + create a components folder
-You should not be able to acess other routes without login
-If the token is not present, redirect user to login page
-Logout Feature
-Get the feed and add the feed in the store
-build the user card on feed
-Edit Profile Feature
-Show Toast Message on save of profile
-See all my connections
-See all my Connections Requests
Feature - Accept/Request Connection Request

Remaining:
-Send/ignore the user card form the feed
-Signup New User
-E2E Testing

#Deployment

-Signup on AWS
-Launch instance
chmod 400 <secret>.pem
-Connect to my Cloud Machine using SSH command
ssh -i "devTinder-secret.pem" ubuntu@ec2-13-236-209-119.ap-southeast-2.compute.amazonaws.com
-Install Node version 20.17.0 same as the project version on the Cloud Computer
-Git clone

    -Frontend
    -npm install ->dependencies install
    -npm run build
    -sudo apt update
    -sudo apt install nginx
    -sudo systemctl start nginx
    -Copy code from dist(build files ) to /var/www.html/
    -sudo cp -r dist/\* /var/www/html/
    -Enable port 80 of your instance

    -Backend
    -allowd ec2 instance public IP on mongodb server
    -npm install pm2 -g
    -pm2 start npm --name "devTinder-backend" --start
    -pm2 start npm --start
    -pm2 logs
    -pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    -config nginx -/etc/nginx/sites-available/default
    -restart nginx- sudo systemctl restart nginx
    -Modify the BASEURL in frontedn project to "/api"

#Nginx config:

    Forntend =http://13.236.209.119/
    Backend =http://13.236.209.119:7777/

    Domain name= devtinder.com =>13.236.209.119

    Frontend= devtinder.com
    Backend = devtinder.com:777 => divtinder.com/api

    nginx config:

    server_name 13.236.209.119;

     location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
