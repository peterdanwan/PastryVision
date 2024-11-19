# PastryVision

## About the Authors

`Course`: CVI620
`Group members`: Peter Wan, Mimi Dang, Aryan Khurana, Jeremy Lee
`Project Title`: PastryVision

## What is PastryVision?

`PastryVision` is a `Computer Vision` project that aims to serve small pastry shops and enhance their workflow.
These are the main benefits we wish to offer:

- `pastry shops` will be able to become self-serve
- `pastry shops` can save on plastic / barcode printing costs
  - Items will retain their freshness since they won't be sealed
- The technology used can be run locally on a machine, having no need to host the application on the web
- Simple setup:
  - React app: single page application (no routing involved)
    - Most work will be done in:
      - `frontend/src/App.jsx`
      - `frontend/src/App.css`
      -
  - Connect with Computer Vision backend (...how?)
- use computer vision to detect different pastry items
  based on the pastry item, we can tally up a person's cart
  we will have a camera that scans the items on the tray
  people will still need to line up, but we don't need any apps or anything

## References

1. [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/studio)
2. [Example with our Tech stack??](https://eliraneln.medium.com/real-time-object-detection-using-ml5-js-and-react-c47612c60852)
3. [Vite - to configure our single page react app properly](https://vite.dev/guide/)
4. [TailwindCSS - component classes used for styling the frontend](https://tailwindcss.com/docs/guides/vite)

## Project Timeline

| Main components (briefly explain)                 | Tentative completion date | Assigned to |
| ------------------------------------------------- | ------------------------- | ----------- |
| Frontend: Rectangle showing live camera component | Dec 6                     | everyone    |
| Frontend: Checkout/Cart section component         | Dec 6                     | everyone    |
| Get bakery pictures / Dataset                     | Dec 6                     | everyone    |
| Backend: Load images + resize                     | Dec 10                    | everyone    |
| Backend: Build + Train dataset                    | Dec 10                    | everyone    |
