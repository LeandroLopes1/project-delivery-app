import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import ContextRegister from '../context/ContextRegister';
import OrderDetailSellerHeader from './OrderDetailSellerHeader';

function OrderDetailSellerMain(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const {
    orderDetail,
    setOrderDetail,
  } = useContext(ContextRegister);

  const { removeButton } = props;

  const { sales } = orderDetail;
  const arrValue = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  if (removeButton) arrValue.push('Remover Item');

  const priceTotal = (price, quant) => (
    (price * quant).toFixed(2).toString().replace(/\./, ','));

  const API_URL = 'http://localhost:3001/';

  const getSaleId = (id) => axios.get(`${API_URL}sales/${id}`);

  const getSale = async (orderId) => {
    const { data: { response } } = await getSaleId(orderId);
    setOrderDetail(response);
    setLoading(false);
  };

  useEffect(() => {
    const id = history.location.pathname.split('/')[3];
    getSale(id);
  }, [loading]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <main>
      <OrderDetailSellerHeader orderDetail={ orderDetail } />
      <table>
        <thead>
          <tr>
            {arrValue.map((arr, index) => <th key={ index }>{arr}</th>)}
          </tr>
        </thead>
        <tbody>
          {sales && sales.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {product.price.replace(/\./, ',')}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {priceTotal(product.price, product.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid="seller_order_details__element-order-total-price"
      >
        {orderDetail && orderDetail.sale.totalPrice.replace(/\./, ',')}
      </p>
    </main>
  );
}

OrderDetailSellerMain.propTypes = {
  removeButton: PropTypes.bool.isRequired,
};

export default OrderDetailSellerMain;
