<template>
    <div class="container">
        <h1 class="mt-5">Add Product</h1>
        <form @submit.prevent="addProduct" class="mt-3">
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
            <div class="mb-3 form-check">
                <input type="checkbox" v-model="product.top" id="markAsTop" class="form-check-input">
                <label for="markAsTop" class="form-check-label">Mark as Top</label>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" v-model="product.deleted" id="markAsDeleted" class="form-check-input">
                <label for="markAsDeleted" class="form-check-label">Mark as Deleted</label>
            </div>
            <button type="submit" class="btn btn-primary">Add Product</button>
        </form>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: '',
                top: false,
                deleted: false,
            }
        }
    },
    methods: {
        async addProduct() {
            await axios.post('http://localhost:8000/api/products', this.product);
            this.$router.push('/');
        }
    }
}
</script>
