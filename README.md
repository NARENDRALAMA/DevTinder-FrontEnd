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

# Deployment

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
    -sudo systemctl enable nginx
    -Copy code from dist(build files ) to /var/www/html/
    -sudo scp -r dist/\* /var/www/html/
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

# Nginx config:

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

# Adding a Custom Domain name

-purchased domain name form godaddy
-signup on cloudfare & add a new domian name
-change the nameservers on godaddy and point it to cloudfare
-wait for sometime till your nameservers are updated
-DNS record: A devtinder.in 43.204.96.49
-Enable SSL for website

# Sending Emails via SES

-Create a IAM user
-Give Acess to AmazonSESFullAcess
-Amazon SES:Create an Identity
-Verify your domain name
-Verify an email address
-Install AWS SDK -v3
-code Example-https://github.com/awsdocs/aws-doc-sdk-examples/tree/e73d687b0c6aca80451fbd185bb8bce7b2c69eb1/javascriptv3/example_code/ses#code-examples
-Setup SesClient
-Acess Credentials should be created in Iam under SecurityCredentials tab
-Add the credentials to the env file
-Write code for SESClient
-Write code for Sending email address
-Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS

-Installing node-cron
-Learning about cron expressions syntax -crontab.guru
-Schedule a job
-date-fns
-Find all the unique email Id who have got connection Request in previous day
-Send Email
-Explore queue mechanism to send bulk emails
-Amazon SES Bulk Email
-Make sendEmail function dynamic
-bee-queue & bull npm packages

# Payment system

-Sign up on Stripe and create Account
-Get Publishable Key, Secret Key, Webhook Secret
-npm install stripe
-Create utils/stripe.js

# Backend Setup:

-Create pricing plans in Stripe dashboard
-Copy Price IDs
-Store them in backend
-Create /create-checkout-session API
-Map plan → priceId
-Detect frontend URL
-Create checkout session
-Return session.url
-Frontend redirects user to Stripe

# Webhook Events Used

-We only use 3 events:
-checkout.session.completed → activate subscription
-invoice.payment_succeeded → renew subscription
-customer.subscription.deleted → cancel subscription

# Webhook Setup:

-Create /stripe webhook route (POST)
-Get Stripe signature from headers
-Verify event using webhook secret
-Switch on event type
-Handle only these 3 events:
-checkout.session.completed → upgrade user
-invoice.payment_succeeded → extend subscription
-customer.subscription.deleted → downgrade user
-Update user in database accordingly
-Always respond with:
-res.json({ received: true })

# Real Time Chat using Websocket(Socket.io)
