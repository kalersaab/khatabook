import { Category } from '@/interface'
import { atom } from 'jotai'
export const cat = atom<Category[]>([])
export const productList = atom <Array<{
      id: string;
      quantity: string;
      rate: string;
      price: string;
      detail: string;
    }>>([])