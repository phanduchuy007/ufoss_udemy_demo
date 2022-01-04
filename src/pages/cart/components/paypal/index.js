import React, { useRef, useEffect } from 'react';
import useCustomToast from '../../../../hooks/useCustomToast';

export default function Paypal(props) {
  const { totalMoney, onSubmit } = props;
  const paypal = useRef();
  const toast = useCustomToast();

  const handlePaypal = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Cool looking table',
                amount: {
                  currency_code: 'CAD',
                  value: totalMoney,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          onSubmit();
        },
        onError: error => {
          const message = error?.response?.data?.message;
          toast({ title: message, status: 'error' });
        },
      })
      .render(paypal.current);
  };

  useEffect(() => {
    handlePaypal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
