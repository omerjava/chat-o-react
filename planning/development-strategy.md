# Project Name

<!-- describe your project -->

---

## Setup

<!-- what code do you need just to open the project? this might include:
  - boilerplate code (https://brandlitic.com/what-is-boilerplate-code/)
  - loading program data
  - rendering the initial user interface
-->

## Must Haves

<!-- copy this section once for each must-have user story -->

## user story 1 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can see all channels.

<!-- write any extra notes or description -->

<!-- describe the tasks to build this user story
  these will have the `type: logic` label, for example
  not all projects will have all types of tasks
  and these are not the only possible types, just some suggestions
-->

### Interface: I can see all channels

- Create `channel` and `channelsAndMessagesContainer` components in React
  - [ ] channel component with `Channel.jsx` and `Channel.css`
  - [ ] channelsAndMessagesContainer component with .jsx and .css files
  - [ ] develop nice UI in CSS with proper colors
  - [ ] these will be copy-pasted into the issue

### Interaction: I can see all channels

- Create api-call file and functions to fetch channel names from database
  - [ ] `channelApiCalls.js` file under api-calls folder in src
  - [ ] create `getChannels()` handle function in `ChannelsAndMessagesContainer.jsx`
  - [ ] these will be copy-pasted into the issue

### Data: I can see all channels

- Create Channel collection type (database table) in Strapi
  - [ ] channel collection type with id, channel, username, messages (relation)
  - [ ] activate Channel endpoints from settings in Strapi
  - [ ] these will be copy-pasted into the issue

## user story 2 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can add a new channel.

### Interface: I can add a new channel

- Create an `addChannel div` in `ChannelsAndMessagesContainer.jsx` file in React
  to contain all relevant codes for the feature of adding channel
  - [ ] add `new-channel-btn` button to open user input area with toggle feature
  - [ ] `addNewChannel` div will be opened when clicked `new-channel-btn` button
  - [ ] there will be user input, submit and cancel buttons in `addNewChannel` div

### Interaction: I can add a new channel

- Create api-call file and functions to send new channel name to database
  - [ ] `channelApiCalls.js` file under api-calls folder in src
  - [ ] write `createNewChannel()` handle function in  `ChannelsAndMessagesContainer.jsx` file

### Data: I can add a new channel

- Create channel collection type (database table) in Strapi
  - [ ] activate endpoints from settings in Strapi

## user story 3 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can see other users.

### Interface: I can see other users

- Create an `user` and `usersContainer` components in React
  - [ ] user component with `User.jsx` and `User.css`
  - [ ] usersContainer with `UsersContainer.jsx` and `UsersContainer.css`

### Interaction: I can see other users

- Create api-call file and functions to get all users info from database
  - [ ] `userApiCalls.js` file under api-calls folder in src
  - [ ] write `getAllUsers()` handle function in `UsersContainer.jsx` file

### Data: I can see other users

- Add to email field and messages relation field to existing User collection type (database table) in Strapi
  - [ ] activate User endpoints from settings in Strapi

## user story 4 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can send a message in any channel with my username.

### Interface: I can send a message in any channel

- Create an `message` and `channelsAndMessagesContainer` components in React
  - [ ] message component with `Message.jsx` and `Message.css`
  - [ ] channelsAndMessagesContainer with `ChannelsAndMessagesContainer.jsx` and `ChannelsAndMessagesContainer.css`

### Interaction: I can send a message in any channel

- Create api-call file and functions to get all messages according to channels from database
  - [ ] `messageApiCalls.js` file under api-calls folder in src
  - [ ] write `getMessages()` handle function in `ChannelsAndMessagesContainer.jsx` file

### Data: I can send a message in any channel

- Create message collection type (database table) in Strapi
  - [ ] message collection with id, message(text), username(relation), channel(relation) fields
  - [ ] activate Message endpoints from settings in Strapi

## user story 5 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can see who send the message.

### Interface: I can see who send the message

- Create a div in `Message.jsx` component for the username
  - [ ] a div in `Message.jsx` file for the username
  - [ ] add proper CSS features to this div tag in `Message.css`

### Interaction: I can see who send the message

- Create api-call file and functions to post and get all messages from database with username
  - [ ] `messageApiCalls.js` file under api-calls folder in src
  - [ ] write `getMessages()` handle function in `ChannelsAndMessagesContainer.jsx` file
  - [ ] write `postNewMessage()` handle function in `ChannelsAndMessagesContainer.jsx` file in order to create a new message in database messages collection with username

### Data: I can see who send the message

- Create message collection type (database table) in Strapi
  - [ ] activate Message endpoints from settings in Strapi
  
## user story 6 - must have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can see the date of message in the message.

### Interface: I can see the date of message

- Create a div in `Message.jsx` component for the date of message
  - [ ] a div in `Message.jsx` file for the date of message
  - [ ] add proper CSS features to this div tag in `Message.css`

### Interaction: I can see the date of message

- Create api-call file and functions to get all messages from database with the date of message
  - [ ] `messageApiCalls.js` file under api-calls folder in src
  - [ ] write `getMessages()` handle function in `ChannelsAndMessagesContainer.jsx` file

### Data: I can see the date of message

- Create message collection type (database table) in Strapi
  - [ ] activate Message endpoints from settings in Strapi
  
## Should Haves

## user story 1 - should have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can create a user account and login to the application.

### Interface: I can create a user account and login to the application

- Create a `login` component in React to create user account and login
  - [ ] create `Login.jsx` and `Login.css` files under `login` component
  - [ ] create login and register sections in `Login.jsx` file with login and register forms

### Interaction: I can create a user account and login to the application

- Create api-call file and functions to register new user to database and login with credentials
  - [ ] `authApiCalls.js` file under api-calls folder in src
  - [ ] write `registerAuthenticatedUser()` and `login()` handle function in `Login.jsx` file

### Data: I can create a user account and login to the application

- Use User collection (database table) in Strapi to register new user and login
  - [ ] activate User endpoints with authentication from settings in Strapi

## user story 2 - should have

<!-- each issue created from this section will have the `for: user story` label -->

As a user I can change my username, email and password

### Interface: I can change my username, email and password

- Create a `myProfile` component in React to see and change user account details
  - [ ] create `MyProfile.jsx` and `MyProfile.css` files under `myProfile` component
  - [ ] add this component to `ChannelsAndMessagesContainer.jsx`
  - [ ] use `input` and `button` HTML tags to get user input and submit it for updating

### Interaction: I can change my username, email and password

- Create api-call file and functions to update logged in user info in database
  - [ ] `userApiCalls.js` file under api-calls folder in src
  - [ ] write `updateUserAccount()` handle function in `MyProfile.jsx` file

### Data: I can change my username, email and password

- Use User collection (database table) in Strapi to update current user
  - [ ] activate User endpoints with authentication from settings in Strapi
  