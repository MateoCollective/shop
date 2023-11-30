document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [{
                id: 1,
                name: 'SUPERMODIFIED YNUK SHOES',
                img: '1.webp',
                price: 2200000
            },
            {
                id: 2,
                name: 'GAZELLE INDOOR SHOES',
                img: '2.jpg',
                price: 2500000
            },
            {
                id: 3,
                name: 'SUPERMODIFIED YNUK SHOES',
                img: '1.webp',
                price: 2200000
            },
            {
                id: 4,
                name: 'Aceh Gayo',
                img: '1.webp',
                price: 35000
            },
            {
                id: 5,
                name: 'Sumatra Mandheling',
                img: '1.webp',
                price: 40000
            },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // check apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada masih kosong
            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada, tambah quantity dan totalnya
                        item.quantity += 1;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item remove berdasarkan id
            const cartItem = this.items.find((item) => item.id);

            // jika lebih dari satu
            if (cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                // jika barang sisa 1 
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity --;
                this.total -= cartItem.price;
            }
        },
    });
});

// conversi mata uang
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};