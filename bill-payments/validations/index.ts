import * as yup from 'yup';

export const validate = (t:any)=>{
  return yup.object().shape({
      name: yup.string().required(t("products.validation.productName")),
      price: yup.number().required(t("products.validation.price")).positive().integer(),
      categoryId: yup.string().required(t("products.validation.category")),
    });
}