# PastryVision Backend

This is the [FastAPI](https://fastapi.tiangolo.com) backend for PastryVision Web Application ✨

## Running the Backend Locally

This guide walks you through how to set up and run your Python application using Poetry, an alternative to `pip` that simplifies dependency management, virtual environments, and more. By using Poetry, you can easily manage packages, isolate your project environment, and run your app with a single command.

### Step 1: Install Poetry

If you haven't installed Poetry yet, you can do so by following the installation instructions on the [Poetry website](https://python-poetry.org/docs/#installation) for your platform.

### Step 2: Activate the Virtual Environment

To activate the Poetry-managed virtual environment, run:

```bash
poetry shell
```

This command opens a new shell session with the virtual environment activated, where you can run Python commands as needed. You can now use the environment to run your app and interact with the dependencies.

### Step 3: Install Dependencies

Once you've initialized the project, you can install the dependencies by running:

```bash
poetry install
```

This will install all dependencies specified in your `pyproject.toml` file and create a virtual environment for your project. Poetry automatically manages your environment, so you don’t need to worry about creating or activating a virtual environment manually.

### Step 5: Run the App

Once the virtual environment is activated, you can run your app using `uvicorn`. Assuming your FastAPI app is located in `app.main:app`, run the following command:

```bash
uvicorn app.main:app --reload
```

- `app.main:app`: This specifies the location of your FastAPI app object (in the `main.py` file inside the `app` directory).
- `--reload`: This option enables auto-reloading of the app during development, so changes in the code are reflected without needing to restart the server.

Your application will now be running at `http://127.0.0.1:8000/` by default.

### Additional Development Guidelines

#### Adding a Package to the Project

To add a package to the project, use the following command:

```bash
poetry add <package-name>
```

For example, to add `requests`:

```bash
poetry add requests
```

This will automatically update your `pyproject.toml` file and install the new package.

#### Removing a Package from the Project

If you want to remove a package, you can do so with:

```bash
poetry remove <package-name>
```

For example, to remove `requests`:

```bash
poetry remove requests
```

This will update the `pyproject.toml` file and uninstall the package from your environment.
