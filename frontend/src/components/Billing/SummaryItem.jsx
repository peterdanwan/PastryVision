import PropTypes from 'prop-types';

export default function SummaryItem({ field, fieldValue = 0, className = '' }) {
  const formattedValue = fieldValue.toFixed(2);

  return (
    <div className={`flex justify-between mb-2 text-gray-700 ${className}`}>
      <span>{field}</span>
      <span>${formattedValue}</span>
    </div>
  );
}

SummaryItem.propTypes = {
  field: PropTypes.string.isRequired,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
