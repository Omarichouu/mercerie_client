import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  DEFAULT_MERCHANT_WILAYA_ID,
  fetchYalidineResource,
  findCommuneByName,
  findWilayaByName,
  getDeliveryFeeFromYalidineFees,
} from "lib/yalidine";

import { DEFAULT_DELIVERY_TYPE } from "../product.constants";

const INITIAL_FORM = {
  fullName: "",
  phoneNumber: "",
  confirmedPhoneNumber: "",
  wilaya: "",
  deliveryType: DEFAULT_DELIVERY_TYPE,
  commune: "",
  relayPoint: null,
  address: "",
  note: "",
};

export const useShippingForm = ({ t }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [feesData, setFeesData] = useState(null);
  const [centers, setCenters] = useState([]);
  const [deliveryFees, setDeliveryFees] = useState(0);
  const [isLoadingCenters, setIsLoadingCenters] = useState(false);

  const selectedWilaya = useMemo(
    () => findWilayaByName(wilayas, formData.wilaya),
    [formData.wilaya, wilayas]
  );

  const selectedCommune = useMemo(
    () => findCommuneByName(communes, formData.commune),
    [communes, formData.commune]
  );

  useEffect(() => {
    const loadWilayas = async () => {
      try {
        const data = await fetchYalidineResource("wilayas", {
          fields: "id,name,zone,is_deliverable",
          order_by: "id",
        });
        setWilayas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching wilayas:", error);
        toast.error(t("centersFetchError"));
      }
    };

    loadWilayas();
  }, [t]);

  useEffect(() => {
    if (!selectedWilaya?.id) {
      setCommunes([]);
      setFeesData(null);
      setCenters([]);
      return;
    }

    const loadShippingData = async () => {
      setIsLoadingCenters(true);
      try {
        const [communesData, feesResponse, centersData] = await Promise.all([
          fetchYalidineResource("communes", {
            wilaya_id: selectedWilaya.id,
            fields:
              "id,name,wilaya_id,wilaya_name,has_stop_desk,is_deliverable,delivery_time_parcel,delivery_time_payment",
            order_by: "id",
          }),
          fetchYalidineResource("fees", {
            from_wilaya_id: DEFAULT_MERCHANT_WILAYA_ID,
            to_wilaya_id: selectedWilaya.id,
          }),
          fetchYalidineResource("centers", {
            wilaya_id: selectedWilaya.id,
          }),
        ]);

        setCommunes(Array.isArray(communesData) ? communesData : []);
        setFeesData(feesResponse || null);

        const normalizedCenters = Array.isArray(centersData)
          ? centersData
          : [];
        if (selectedWilaya.id === DEFAULT_MERCHANT_WILAYA_ID) {
          const annabaCenter = {
            center_id: 230101,
            name: "Magasin Crystal Mercerie",
            address: "Magasin Crystal Mercerie - Rue Asla Hocine",
            commune_id: 2301,
            commune_name: "Annaba",
            wilaya_id: DEFAULT_MERCHANT_WILAYA_ID,
            wilaya_name: "Annaba",
          };

          const mergedCenters = [annabaCenter, ...normalizedCenters].filter(
            (center, index, array) =>
              index ===
              array.findIndex(
                (item) => `${item.center_id}` === `${center.center_id}`
              )
          );
          setCenters(mergedCenters);
        } else {
          setCenters(normalizedCenters);
        }
      } catch (error) {
        console.error("Error fetching shipping data:", error);
        toast.error(t("centersFetchError"));
      } finally {
        setIsLoadingCenters(false);
      }
    };

    loadShippingData();
  }, [selectedWilaya?.id, t]);

  useEffect(() => {
    if (!selectedWilaya || !feesData) {
      setDeliveryFees(0);
      return;
    }

    const fees = getDeliveryFeeFromYalidineFees({
      feesData,
      deliveryType: formData.deliveryType,
      communeName: selectedCommune?.name || formData.commune,
      communeId: selectedCommune?.id,
    });

    setDeliveryFees(fees);
  }, [
    feesData,
    formData.commune,
    formData.deliveryType,
    selectedCommune?.name,
    selectedCommune?.id,
    selectedWilaya,
  ]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "wilaya" || name === "deliveryType"
        ? {
            commune: "",
            relayPoint: null,
          }
        : {}),
    }));
  }, []);

  const handleRelaySelect = useCallback(
    (centerId) => {
      const selectedCenter = centers.find(
        (center) => `${center.center_id}` === `${centerId}`
      );
      setFormData((prev) => ({
        ...prev,
        relayPoint: selectedCenter || null,
        commune: selectedCenter?.commune_name || prev.commune,
      }));
    },
    [centers]
  );

  const resetForm = useCallback(() => setFormData(INITIAL_FORM), []);

  return {
    formData,
    handleInputChange,
    handleRelaySelect,
    deliveryFees,
    wilayas,
    communes,
    centers,
    isLoadingCenters,
    resetForm,
  };
};
