// import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
  let location = useLocation();
  
  return location;
}
