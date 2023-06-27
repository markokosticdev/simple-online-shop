<template>
    <div class="container product-details-page">
        <h1 class="mt-5">Product Details</h1>
        <div v-if="product" class="product-details-nav mt-3 row g-2">
            <div class="col-6 col-md-3">
                <button @click="updateProduct" class="btn btn-success w-100">Update Product</button>
            </div>

            <div class="col-6 col-md-3">
                <button @click="deleteProduct" class="btn btn-danger w-100">Delete Product</button>
            </div>

            <div class="col-6 col-md-3">
                <button @click="toggleDeleted" class="btn btn-warning w-100">
                    {{ product.deleted ? 'Unmark as Deleted' : 'Mark as Deleted' }}
                </button>
            </div>

            <div class="col-6 col-md-3">
                <button @click="toggleTop" class="btn btn-info w-100">{{
                        product.top ? 'Unmark as Top' : 'Mark as Top'
                    }}
                </button>
            </div>
        </div>

    </div>
    <div v-if="product" class="container product-details-card mt-3">
        <p>
                          <span :class="{'badge bg-primary': product.top, 'badge bg-secondary': !product.top}">
                            {{ product.top ? 'Top Product' : 'Normal Product' }}
                          </span>
            |
            <span
                :class="{'badge bg-warning text-dark': product.deleted, 'badge bg-success': !product.deleted}">
                            {{ product.deleted ? 'Deleted Product' : 'Available Product' }}
                          </span>
        </p>
        <p>{{ product.description }}</p>
        <p>${{ product.price }}</p>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: null
        }
    },
    async created() {
        const response = await axios.get(`http://localhost:8000/api/products/${this.$route.params.id}`);
        this.product = response.data;
        this.$store.commit('addViewed', this.product);
    },
    methods: {
        async updateProduct() {
            this.$router.push({name: 'ProductUpdate', params: {id: this.product.id}});
        },
        async deleteProduct() {
            await axios.delete(`http://localhost:8000/api/products/${this.$route.params.id}`);
            this.$router.push('/');
        },
        async toggleDeleted() {
            const updatedProduct = {...this.product, deleted: !this.product.deleted};
            await axios.put(`http://localhost:8000/api/products/${this.$route.params.id}`, updatedProduct);
            this.product = updatedProduct;
        },
        async toggleTop() {
            const updatedProduct = {...this.product, top: !this.product.top};
            await axios.put(`http://localhost:8000/api/products/${this.$route.params.id}`, updatedProduct);
            this.product = updatedProduct;
        }
    }
}
</script>
