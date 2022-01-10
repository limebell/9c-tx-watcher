import React, { useState, useEffect, useCallback } from "react";
import apiRequest from "../../utils/api-request";

function AddressContainer(): JSX.Element {
  const [addresses, setAddresses] = useState<object>({});
  const fetchAddresses = useCallback(async () => {
    try {
      const response = await apiRequest.getAddresses();
      setAddresses((prev) => {
        return {
          ...prev,
          sourceAddress: response.data.sourceAddress,
          targetAddress: response.data.targetAddress,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const interval = setInterval(fetchAddresses, 1000);
    }
    return () => {
      mounted = false;
    };
  }, [fetchAddresses]);
  return (
    <div>
      <h1>Address Container</h1>
    </div>
  );
}

export default AddressContainer;
