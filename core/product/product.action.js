import { productService } from './product.service.js'

export const productActions = (await productService.getActions());