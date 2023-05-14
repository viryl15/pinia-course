import { defineStore, acceptHMRUpdate } from 'pinia';

import { groupBy, sumBy } from 'lodash';

import { useAuthUserStore } from '@/stores/AuthUserStore';

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        }
    },

    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,

        grouped: (state) => {
            const grouped = groupBy(state.items, (item) => item.name);
            const sorted = Object.keys(grouped).sort()

            let inOrder = {};

            sorted.forEach((key) => (inOrder[key] = grouped[key]));

            return inOrder;
        },

        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => sumBy(state.items, 'price'),
    },

    actions: {
        checkout() {
            const authUserStore = useAuthUserStore();
            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
        },
        addItems(count, item) {
            count = parseInt(count);

            for (let index = 0; index < count; index++) {
                this.items.push({...item})
              }
        },

        removeItem(name){
            this.items = this.items.filter(item => item.name !== name)
        },

        updateItemCount(item, count) {
            this.removeItem(item.name);
            this.addItems(count, item);
        }
    }
});


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}