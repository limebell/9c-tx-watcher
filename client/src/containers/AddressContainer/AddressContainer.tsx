import React, { useState, useEffect, useCallback } from "react";
import AddressesView from "../../components/organisms/AddressesView/AddressesView";
import apiRequest from "../../utils/api-request";
import axios from "axios";
import { Address } from "../../types";

function AddressContainer(): JSX.Element {
  const [addresses, setAddresses] = useState<Address>({
    sourceAddress: "",
    targetAddress: "",
  });
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);
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
      setFetchSuccess(true);
    } catch (error) {
      console.error(error);
      setFetchSuccess(false);
    }
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    let mounted = true;
    if (mounted) {
      const interval = setInterval(fetchAddresses, 1000);
    }
    return () => {
      mounted = false;
      source.cancel();
    };
  }, [fetchAddresses]);
  return <AddressesView addresses={addresses} fetchSuccess={fetchSuccess} />;
}

export default AddressContainer;
