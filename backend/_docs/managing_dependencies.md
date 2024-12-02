# Managing Dependencies

## Adding a New Package

```bash
# Install the package
pip3 install package_name

# Update requirements.txt
pip3 freeze > requirements.txt
```

## Removing a Package

```bash
# Uninstall the package
pip3 uninstall package_name

# Update requirements.txt
pip3 freeze > requirements.txt
```

**Best Practices:**

- Always activate your virtual environment before working
- Use `pip freeze > requirements.txt` after adding/removing packages
