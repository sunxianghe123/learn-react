import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoTwo from './views/Demo2';
import './index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <DemoTwo></DemoTwo>
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