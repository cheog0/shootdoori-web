export interface GiftOrderForm {
  productId: number;
  ordererName: string;
  message: string;
  messageCardId: string;
  receivers: Array<{
    name: string;
    phoneNumber: string;
    quantity: number;
  }>;
}

export type Recipient = { name: string; phone: string; quantity: number };
export type RecipientsForm = { recipients: Recipient[] };
