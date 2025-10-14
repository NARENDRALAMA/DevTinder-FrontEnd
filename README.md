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

Body
NavBar
Route=/ =>Feed
Route=/login =>Login
Route=/connections => Connections
Router=/profile =>Profile
