import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>aaa</div>
  </React.StrictMode>
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