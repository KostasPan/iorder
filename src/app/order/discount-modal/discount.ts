export class Discount {
  isDiscountActive = false;
  discountedtotal = 0;
  total = 0;
  discount = 0;
  type = '';
  discountStr = '';
  discountStrFunc() {
    return this.type === 'percentage'
      ? '- ' + this.discount + ' %'
      : '- € ' + this.discount;
  }
  clearfunc() {
    this.isDiscountActive = false;
    this.discountedtotal = 0;
    this.total = 0;
    this.discount = 0;
    this.type = '';
    this.discountStr = '';
  }
}
