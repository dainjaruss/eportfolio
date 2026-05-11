import { useState, useEffect } from 'react';

// Generic fetch hook - pass any async fn that returns data
// Reusing the dead-flag pattern from week5 to prevent state updates after unmount
const useFetch = (fetchFn) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let dead = false; // cleanup flag so setState dont happen after unmount

    fetchFn()
      .then(result => { if (!dead) setData(result); })
      .catch(err   => { if (!dead) setError(err.message || 'Something went wrong'); })
      .finally(()  => { if (!dead) setLoading(false); });

    return () => { dead = true; };
  }, []); 

  return { data, loading, error };
};

export default useFetch;
