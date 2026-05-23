import { useCallback, useMemo, useState } from "react";

export const useVariantSelection = ({ product, locale, modelLabel }) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedColorImage, setSelectedColorImage] = useState(null);

  const getColorId = useCallback((color) => {
    const raw = color?._id ?? color?.id;
    if (!raw) return "";
    if (typeof raw === "string") return raw;
    if (typeof raw?.toString === "function") return raw.toString();
    return String(raw);
  }, []);

  const activeVariantColors = useMemo(
    () =>
      (product?.variant_color || []).filter((item) => item.isActive !== false),
    [product?.variant_color]
  );

  const colorAliases = useMemo(() => {
    const map = new Map();

    activeVariantColors.forEach((color) => {
      const id = getColorId(color);
      const type = color?.type || "";

      if (id) {
        const byId = new Set([id]);
        if (type) byId.add(type);
        map.set(id, byId);
      }

      if (type) {
        const byType = map.get(type) || new Set([type]);
        if (id) byType.add(id);
        map.set(type, byType);
      }
    });

    return map;
  }, [activeVariantColors, getColorId]);

  const activeVariants = useMemo(
    () => (product?.variant || []).filter((item) => item.isActive !== false),
    [product?.variant]
  );

  const activeCombinations = useMemo(
    () =>
      (product?.variant_combinations || []).filter(
        (combo) => combo.isActive !== false
      ),
    [product?.variant_combinations]
  );

  const selectionOrder = useMemo(() => {
    const order = [];

    if (activeVariantColors.length > 0) {
      order.push("couleur");
    }

    activeVariants.forEach((variant) => {
      if (variant?.type?.fr) {
        order.push(variant.type.fr);
      }
    });

    return order;
  }, [activeVariantColors.length, activeVariants]);

  const selectionState = useMemo(() => {
    const state = {};
    if (selectedColorImage?.type) {
      const selectedColorId = getColorId(selectedColorImage);
      state.couleur = {
        value: selectedColorId || selectedColorImage.type,
        type: selectedColorImage.type,
        id: selectedColorId,
        priceAdjustment: selectedColorImage.priceAdjustment || 0,
      };
    }
    Object.assign(state, selectedVariants);
    return state;
  }, [getColorId, selectedColorImage, selectedVariants]);

  const getCandidateValues = useCallback(
    (type, value) => {
      if (type !== "couleur") return [value];
      const aliasSet = colorAliases.get(value);
      return aliasSet ? Array.from(aliasSet) : [value];
    },
    [colorAliases]
  );

  const resetSelectionsAfter = useCallback(
    (currentSelections, changedType) => {
      const changedIndex = selectionOrder.indexOf(changedType);
      if (changedIndex === -1) return currentSelections;

      const nextSelection = { ...currentSelections };
      for (let i = changedIndex + 1; i < selectionOrder.length; i += 1) {
        delete nextSelection[selectionOrder[i]];
      }
      return nextSelection;
    },
    [selectionOrder]
  );

  const isOptionAvailable = useCallback(
    (type, value) => {
      if (activeCombinations.length === 0) return true;

      const candidateValues = getCandidateValues(type, value);

      const relevantCombos = activeCombinations.filter((combo) => {
        const comboOptions = combo.options || [];
        const hasOption = comboOptions.some((opt) => {
          if (opt.type !== type) return false;
          return candidateValues.includes(opt.value);
        });
        if (!hasOption) return false;

        const matchesAllSelections = Object.entries(selectionState).every(
          ([selectedType, selectedObj]) => {
            if (!selectedObj) return true;
            if (selectedType === type) return true;
            const selectedValue = selectedObj.value;
            if (!selectedValue) return true;
            const selectedCandidates = getCandidateValues(
              selectedType,
              selectedValue
            );
            return comboOptions.some(
              (opt) =>
                opt.type === selectedType &&
                selectedCandidates.includes(opt.value)
            );
          }
        );

        return matchesAllSelections;
      });

      return relevantCombos.length > 0;
    },
    [activeCombinations, getCandidateValues, selectionState]
  );

  const handleVariantSelect = useCallback(
    (variantType, value, priceAdjustment) => {
      setSelectedVariants((prev) => {
        const isAlreadySelected = prev[variantType]?.value === value;

        if (isAlreadySelected) {
          const nextSelection = { ...prev };
          delete nextSelection[variantType];
          return resetSelectionsAfter(nextSelection, variantType);
        }

        const nextSelection = {
          ...prev,
          [variantType]: { value, priceAdjustment },
        };
        return resetSelectionsAfter(nextSelection, variantType);
      });
    },
    [resetSelectionsAfter]
  );

  const handleColorSelect = useCallback(
    (color) => {
      setSelectedColorImage((prev) => {
        const prevColorId = getColorId(prev);
        const nextColorId = getColorId(color);
        const isAlreadySelected = nextColorId
          ? prevColorId === nextColorId
          : prev?.type === color?.type;
        if (isAlreadySelected) {
          return null;
        }
        return color;
      });
      setSelectedVariants((prev) => resetSelectionsAfter(prev, "couleur"));
    },
    [getColorId, resetSelectionsAfter]
  );

  const currentPrice = useMemo(() => {
    let calculated = product?.price || 0;
    Object.values(selectedVariants).forEach((variant) => {
      calculated += variant.priceAdjustment || 0;
    });
    if (selectedColorImage?.priceAdjustment) {
      calculated += selectedColorImage.priceAdjustment;
    }
    return calculated;
  }, [product?.price, selectedVariants, selectedColorImage]);

  const missingVariants = useMemo(() => {
    const missing = activeVariants
      .filter((variant) => !selectedVariants[variant.type.fr])
      .map((variant) => variant.type?.[locale] || variant.type.fr);
    if (activeVariantColors.length > 0 && !selectedColorImage) {
      missing.push(modelLabel);
    }
    return missing;
  }, [
    activeVariants,
    activeVariantColors.length,
    locale,
    modelLabel,
    selectedColorImage,
    selectedVariants,
  ]);

  const isProductAvailable = product?.disponible === "disponible";
  const isDisabled = missingVariants.length > 0;
  const isPurchaseBlocked = isDisabled || !isProductAvailable;

  const resetSelections = useCallback(() => {
    setSelectedVariants({});
    setSelectedColorImage(null);
  }, []);

  return {
    selectedVariants,
    selectedColorImage,
    activeVariants,
    activeVariantColors,
    currentPrice,
    missingVariants,
    isProductAvailable,
    isPurchaseBlocked,
    handleVariantSelect,
    handleColorSelect,
    isOptionAvailable,
    resetSelections,
  };
};
