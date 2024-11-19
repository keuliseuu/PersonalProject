import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const app = express();
const port = 5000;  


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your Vite React app's URL
  }));


app.use(express.json());


const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',      
  database: 'ComponentManager',  
  password: 'Bldchris19',  
  port: 5433,            
});

// API endpoint to get components from the database
app.get('/components', async (req, res) => {
  try {
    const result = await pool.query('SELECT component_id, type, value, description, stock, status FROM components;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});