import React, { useEffect } from 'react';

export default function Checkout({ carrito, dates}) {
  console.log(dates, "dates")
  useEffect(() => {
    const script = document.createElement('script');

    const attr_data_preference = document.createAttribute('data-preference-id');
    attr_data_preference.value = dates; //id que le devolvems del backend
    
    script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
    script.setAttributeNode(attr_data_preference);
    script.async = true;

    document.getElementById('form1').appendChild(script)
    return () => {
      document.getElementById('form1').removeChild(script)
    }

  }, [dates]);

  return (
    <div>
      <form id="form1">
        <h4>Checkout</h4>
        <div className="form-group">
          {carrito.map((carrito, index) => {
            return(
              <div key={index} className="formcarrito">
                <ul>
                  <li>{carrito.title}</li>
                  <li>{'$' + carrito.unit_price}</li>
                </ul>
                </div>
            )})}
        </div>
        </form>
        </div>

  )}