import { defineStore } from 'pinia';

// import products from '@/data/products.json'

export const useProductStore = defineStore("ProductStore", {
    // state
    state: () => {
        return {
            products: [],
        }
    },

    // actions
    actions: {
        async fill(){
            this.products = (await import("@/data/products.json")).default;
        }
    }

    //  getters
});