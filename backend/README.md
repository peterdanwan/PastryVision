# PastryVision Backend

This is the [FastAPI](https://fastapi.tiangolo.com) backend for PastryVision Web Application ✨

## Backend Setup and best Practices

### Setup Virtual Environment

```bash
# Create virtual environment
python -m venv venv
```

#### Windows

```bash
# Activate virtual environment
.\venv\Scripts\activate
```

#### macOS/Linux

```bash
# Activate virtual environment
source venv/bin/activate
```

### Install Dependencies

```bash
# Install packages from requirements.txt
pip install -r requirements.txt
```

### Managing Dependencies

#### Adding a New Package

```bash
# Install the package
pip3 install package_name

# Update requirements.txt
pip3 freeze > requirements.txt
```

#### Removing a Package

```bash
# Uninstall the package
pip3 uninstall package_name

# Update requirements.txt
pip3 freeze > requirements.txt
```

### Deactivating Virtual Environment

```bash
# When you're done working
deactivate
```

**Best Practices:**

- Always activate your virtual environment before working
- Use `pip freeze > requirements.txt` after adding/removing packages

## Runnning the Backend and testing the socket connection

### Start Backend Server

```bash
# Run with uvicorn
uvicorn app.main:app --reload
```

### WebSocket Testing with Postman

#### WebSocket Connection Details

- **URL:** `ws://127.0.0.1:8000/ws/video-stream`

#### Postman WebSocket Testing Steps

1. Open Postman
2. Click "New" and select "WebSocket Request"
3. Enter WebSocket URL: `ws://127.0.0.1:8000/ws/video-stream`
4. Click "Connect"
5. To send messages, type in message box and click "Send"

**Note:** Ensure backend is running before testing WebSocket connection.

## Docs

You can check out some documentation and references in the [\_docs](./_docs/) directory.
