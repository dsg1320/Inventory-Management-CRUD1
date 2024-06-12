export default interface Orders{
    Order_id: number,
    quantity: number,
    amount: number,
    prod_id: number|null,
    sup_id: number
    supplierName?:string,
    productName?:string
}