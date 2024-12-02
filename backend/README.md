# Start/Stop the PastryVision Backend Server

This is the [FastAPI](https://fastapi.tiangolo.com) backend for PastryVision Web Application ✨

## Prerequisites

- Install [Python](https://www.python.org/downloads/)

## Create a Virtual Environment

Within the `backend` folder, run the command below to create a `virtual environment` in which you will install the necessary backend dependencies for `PastryVision`:

```bash
# Use the venv command to create a virtual environment folder called venv
python -m venv venv
```

> [!NOTE]
> This installs a `venv` folder within the `backend` folder that you'll install the necessary dependencies to.

## Run the OS specific scripts to activate/deactivate your virtual environment

> [!NOTE]
> You must follow the [Create a Virtual Environment](#create-a-virtual-environment) step first.

### Activate Virtual Environment on Windows

```bash
# Activate virtual environment
.\venv\Scripts\activate
```

### Activate Virtual Environment on macOS/Linux

```bash
# Activate virtual environment
source venv/bin/activate
```

### Deactivate Virtual Environment (works on every OS)

```bash
# Deactivate virtual environment
deactivate
```

## Installing the Project's Dependencies

To install PastryVision's necessary backend dependencies, run the following command in the `backend` folder:

```bash
# Install packages from requirements.txt (your venv folder should get larger)
pip install -r requirements.txt
```

## Start/Stop the Backend Server

To start the backend server, run the following command within the `backend` folder:

```bash
# Start the backend server with uvicorn
uvicorn app.main:app --reload
```

> [!NOTE]
> The Backend Server will be hosted on `http://127.0.0.1:8000`.  
> To _stop_ the backend server, go to the terminal where `uvicorn app.main:app --reload` was run, and then press `Ctrl + C` to stop the server.

# Docs

You can check out some documentation and references in the [\_docs](./_docs/) directory.
