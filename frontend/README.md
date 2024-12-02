# Start/Stop the PastryVision Frontend Client

## Prerequisites

- Install [Node.js](https://nodejs.org/en)

## Installing the Project's Dependencies

To install PastryVision's necessary frontend dependencies, run the following command in the `frontend` folder:

```sh
# This installs all of the necessary frontend dependencies for PastryVision
npm i
```

> [!NOTE]
> This installs a `node_modules` folder within the `frontend` folder with the necessary dependencies.

## Start/Stop the frontend client

To start the frontend client, run the following command within the `frontend` folder:

```sh
# The command below will open a connection on localhost:5173
npm run dev
```

> [!NOTE]
> The Frontend Client will be hosted on `http://localhost:5173`.  
> To _stop_ the frontend client, go to the terminal twhere `npm run dev` was run, and then press `Ctrl + C` to stop the client.
