import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './NavBar.tsx';
import Table from './Table.tsx';

import { Component } from './types/component';

import './index.css'
import './App.css'
import 'primereact/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'


function App() {
  const [component, setComponents] = useState<Component[]>([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/components')
      .then(response => {
        setComponents(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Table component={component} />
    </>
  );
}

export default App
