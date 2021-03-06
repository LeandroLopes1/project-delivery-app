import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ContextRegister from '../context/ContextRegister';
import Navbar from '../components/Navbar';
import Order from '../components/Order';

function CustomerOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const { sales, setSales, userObj, setUserObj } = useContext(ContextRegister);

  const API_URL = 'http://localhost:3001/';

  const getSales = async () => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    const API_SELLER = 'seller/';
    const response = await axios
      .get(`${API_URL}${role === 'seller' ? API_SELLER : ''}sales`, {
        headers: {
          Authorization: token,
        },
      });
    return response;
  };

  const renderOrders = () => {
    const render = sales.map((order) => <Order key={ order.id } order={ order } />);
    return render;
  };

  const fetchSales = async () => {
    const salesFetch = await getSales();
    const salesData = salesFetch.data.response;
    setSales(salesData);
    setIsLoading(false);
  };

  useEffect(async () => {
    setUserObj(JSON.parse(localStorage.getItem('user')));
    fetchSales();
  }, [isLoading]);

  // pegar a props name e colocar no Navbar para mostrar o nome do cliente logado.

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <Navbar name={ userObj.name } />
      { renderOrders() }
    </div>
  );
}

export default CustomerOrders;
