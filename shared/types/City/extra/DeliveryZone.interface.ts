type DeliveryCondition = {
  cartCostFrom: number;
  shippingCost: number;
};

export interface DeliveryZoneInterface {
  name: string;
  conditions: DeliveryCondition[];
}

export const defaultDeliveryZones: DeliveryZoneInterface[] = [
  {
    name: 'Зона 1 (зеленая)',
    conditions: [
      {
        cartCostFrom: 150,
        shippingCost: 100,
      },
      {
        cartCostFrom: 500,
        shippingCost: 0,
      },
    ],
  },
  {
    name: 'Зона 2 (синяя)',
    conditions: [
      {
        cartCostFrom: 150,
        shippingCost: 100,
      },
      {
        cartCostFrom: 600,
        shippingCost: 0,
      },
    ],
  },
];
