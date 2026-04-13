const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos del build de Angular
app.use(express.static(path.join(__dirname, 'dist/magaro/browser')));

// Redirige todas las rutas a index.html (necesario para Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/magaro/browser/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});