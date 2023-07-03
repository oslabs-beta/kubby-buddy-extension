import * as React from 'react';
import favicon from '../../public/favicon.png';

export default function Loader() {
  return (
      <div className="loader">
          hi
      <img className="loader-favicon" src={favicon} alt = "hi" />
    </div>
  );
}
