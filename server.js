const express = require('express');
const app = express();
const port = 8080;

const ProductManager = require('./productManager');
const productManager = new ProductManager('products.json'); 

app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); 
    let products = productManager.getProducts();

    if (!isNaN(limit) && limit > 0) {
      products = products.slice(0, limit); 
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos :/' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    const product = productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado :(' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express ejecutando en el puerto ${port}`);
});