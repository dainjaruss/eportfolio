import { useState } from 'react';

// unsing this hook where I need a boolean flip
const useToggle = (initial = false) => {
  const [val, setVal] = useState(initial);
  const toggle = () => setVal(prev => !prev);
  return [val, toggle];
};

export default useToggle;
