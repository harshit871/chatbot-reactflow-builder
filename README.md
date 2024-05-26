## Chatbot Flow Builder
Live Demo: https://chatbot-reactflow-builder.vercel.app/

This chatbot flow builder template offers a streamlined setup to quickly start building flows that connect various message nodes to determine their execution sequence.

## Key Features:

Node Type Limitation: Currently, our flow builder supports only one type of message node within the Nodes panel, specifically Text Messages. However, this design choice is intentional to keep things simple initially, with plans for future expansions to accommodate other types of messages.

Connection Management:
Source Handles: Each source handle can be connected to only one subsequent node, simplifying the decision-making process regarding the flow's execution order.

Target Handles: There's no limit on how many target handles a single node can connect to, allowing for flexible and complex flow structures.

Interactive Settings Panel: Upon selecting a node, the Settings Panel replaces the Nodes Panel. This interactive feature includes a text field for editing the content of the chosen Text Node, enhancing customization capabilities.

This template is designed to facilitate the creation and management of chatbot flows, focusing on simplicity and ease of use while laying the groundwork for future enhancements.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.