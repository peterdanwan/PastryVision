import SummaryItem from './SummaryItem';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

export default function Billing({ items = [], subtotal = 0 }) {
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const consolidatedItems = useMemo(() => {
    const itemMap = items.reduce((acc, item) => {
      const key = item.item;
      if (!acc[key]) {
        acc[key] = {
          item: item.item,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
        };
      } else {
        acc[key].quantity += 1;
        acc[key].totalPrice = acc[key].price * acc[key].quantity;
      }
      return acc;
    }, {});

    return Object.values(itemMap);
  }, [items]);

  return (
    <div className='bg-white rounded-lg shadow-md h-full flex flex-col'>
      <div className='p-4 bg-slate-700 text-white rounded-t-lg'>
        <h2 className='text-2xl font-semibold text-center'>Items</h2>
      </div>
      <div className='flex-grow overflow-auto p-4'>
        {consolidatedItems.length > 0 ? (
          consolidatedItems.map((item, index) => (
            <div key={index} className='mb-4 p-3 bg-gray-50 rounded-lg'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-gray-700 flex-grow font-medium'>
                  {item.item[0].toUpperCase()}
                  {item.item.slice(1, item.item.length)}
                </span>
                <span className='text-gray-900 font-semibold'>
                  ${item.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className='text-sm text-gray-500'>
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center'>No items detected.</p>
        )}
      </div>
      <div className='p-4 border-t border-gray-200'>
        <SummaryItem field='Subtotal' fieldValue={subtotal} />
        <SummaryItem field='Tax (13%)' fieldValue={tax} />
        <SummaryItem
          className='font-bold text-lg'
          field='Total'
          fieldValue={total}
        />
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors'
          >
            Reset
          </button>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

Billing.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ),
  subtotal: PropTypes.number,
};
