<template>
    <div class="container">
        <h1 class="mt-5">Update Product</h1>
        <form v-if="product" @submit.prevent="updateProduct" class="mt-3">
            <div class="mb-3">
                <label for="productName" class="form-label">Product name</label>
                <input v-model="product.name" type="text" id="productName" class="form-control" placeholder="Product name" required>
            </div>
            <div class="mb-3">
                <label for="productDescription" class="form-label">Product description</label>
                <input v-model="product.description" type="text" id="productDescription" class="form-control" placeholder="Product description" required>
            </div>
            <div class="mb-3">
                <label for="productPrice" class="form-label">Product price</label>
                <input v-model="product.price" type="number" step=".01" id="productPrice" class="form-control" placeholder="Product price" required>
            </div>
            <button type="submit" class="btn btn-primary">Update Product</button>
        </form>
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
    },
    methods: {
        async updateProduct() {
            await axios.put(`http://localhost:8000/api/products/${this.$route.params.id}`, this.product);
            this.$router.push('/');
        }
    }
}
</script>
