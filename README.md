This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Local Setup

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Live demo 

https://oddle-github-test-syakir.herokuapp.com/

## Tools & Libraries

1. Axios // as API calling library
2. Material UI // as UI component library
3. Redux // as state management library
4. VScode // as IDE / code editor
5. Heroku // as Deployment tool & hosting

## Note

If you run the project and the github API responded with 403, it means you reach the API limit. You can solve this by changing the internet connection / IP and try again.
This project make a lot of API request in a loop to meet the requirements (get followers & following data). I know this is a bad practice, but i can't find a better way to do it.
1. Search function can call up to 11 github API (1 search API + 10 user detail API) requests on a search
2. View user followers & followings can call up to 31 github API (1 followers list API & 30 user detail API) requests
3. The API loop can be removed by removing / commenting / updating the codes in src/pages/search/search.store.js (line 67) & src/pages/user/user.store.js (line 142 & 176)
