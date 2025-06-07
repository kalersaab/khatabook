type body = { amount: string; notes: string; type: "credit" | "debit" };
export interface ICash {
  body: body;
}
export interface IFormikCash {
    _id?: string;
    amount: number;
    notes: string;
    type: "credit" | "debit";
  }