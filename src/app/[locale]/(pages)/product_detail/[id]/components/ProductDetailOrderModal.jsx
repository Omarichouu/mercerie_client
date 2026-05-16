import OrderForm from "components/product-detail/OrderForm";

const ProductDetailOrderModal = ({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSelectRelayPoint,
  onQuantityChange,
  onSubmit,
  isLoading,
  subtotal,
  deliveryFees,
  total,
  quantity,
  wilayas,
  communes,
  centers,
  isLoadingCenters,
}) => (
  <OrderForm
    isOpen={isOpen}
    onClose={onClose}
    formData={formData}
    onInputChange={onInputChange}
    onSelectRelayPoint={onSelectRelayPoint}
    onQuantityChange={onQuantityChange}
    onSubmit={onSubmit}
    isLoading={isLoading}
    subtotal={subtotal}
    deliveryFees={deliveryFees}
    total={total}
    quantity={quantity}
    wilayas={wilayas}
    communes={communes}
    centers={centers}
    isLoadingCenters={isLoadingCenters}
  />
);

export default ProductDetailOrderModal;
