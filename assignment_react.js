import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// the list component accepts an array of items and renders them.On clicking item,it changes color to green and it also keeps
// track of currently selected item


const SingleListItem = memo(({ index, isSelected, onClick, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={onClick}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,     //adding .isRequired
  isSelected: PropTypes.bool.isRequired,       
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const WrappedListComponent = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  if (!items) return null;

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map(({ text }, index) => (
        <SingleListItem
          key={index}
          onClick={() => handleClick(index)}
          index={index}
          isSelected={selectedIndex === index}
          text={text}
        />
      ))}
    </ul>
  );
});

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WrappedListComponent;
