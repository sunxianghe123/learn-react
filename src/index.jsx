import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoOne from './views/DemoOne';
import './index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <DemoOne></DemoOne>
  </>
);

fetch('/jian/subscriptions/recommended_collections')
  .then(response => response.json())
  .then(value => {
    console.log(value);
  });

fetch('/zhi/news/latest')
  .then(response => response.json())
  .then(value => {
    console.log(value);
  });