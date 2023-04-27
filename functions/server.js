const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // Redirect to default URL
  res.redirect(308, routes.default);
});

Object.keys(routes).forEach((route) => {
  app.get(`/${route}`, (req, res) => {
    // Redirect to custom URL for the specified route
    const customUrl = routes[route];
    if (customUrl) {
      res.redirect(308, customUrl);
    } else {
      // Route not found, redirect to default URL
      res.redirect(308, routes.default);
    }
  });
});

// Add a default route to handle unknown routes
app.get('*', (req, res) => {
  res.redirect(308, routes.default);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
