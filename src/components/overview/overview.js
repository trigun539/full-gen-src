import React, { Component } from 'react';
import { Link }             from 'react-router';
import PropTypes            from 'prop-types';
import styles               from './styles.css';

function Overview ({ items = [] }) {
  const HTML = items
    .sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      }

      return 0;
    })
    .map((x, i) => {
      if (x.link) {
        return (
          <li key={ `overview-item-${i}` } className={ styles.item }>
            <span className={ styles['item-label'] }>{ x.label }</span>
            <span className={ styles['item-value'] }>
              <Link to={ x.link } >{ x.value }</Link>
            </span>
          </li>
        );
      }

      return (
        <li key={ `overview-item-${i}` } className={ styles.item }>
          <span className={ styles['item-label'] }>{ x.label }</span>
          <span className={ styles['item-value'] }>{ x.value }</span>
        </li>
      );
    });
  return (
    <ul className={ styles.wrapper }>
      { HTML }
    </ul>
  );
}

Overview.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.value,
    order: PropTypes.number
  }))
};

export default Overview;
