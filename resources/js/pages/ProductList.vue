<template>
    <div class="container product-list-page">
        <h1 class="mt-5">Product List</h1>
        <div class="product-list-nav mt-3 d-flex align-items-center flex-wrap">
            <div class="flex-shrink-1 d-flex">
                <select v-model="selectedSortField" @change="sortBy()" class="form-select me-2 mt-2">
                    <option value="top">Sort by Top</option>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                </select>
                <select v-model="selectedSortOrder" @change="sortBy()" class="form-select me-2 mt-2">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button @click="showDeleted = !showDeleted" class="btn btn-secondary ml-auto mt-2">Show/Hide Marked as Deleted
            </button>
        </div>
        <div class="product-list mt-3" v-for="product in products" :key="product.id">
            <div class="product-card" v-if="showDeleted || !product.deleted">
                <div class="card">
                    <h2 class="card-title ms-3 mt-3">
                        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }"
                                     class="text-decoration-none text-dark">
                            {{ product.name }}
                        </router-link>
                    </h2>
                    <div class="card-body">
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
                        <button class="btn btn-primary">
                            <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }"
                                         class="text-white">
                                View
                            </router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            showDeleted: false,
            selectedSortField: 'top',
            selectedSortOrder: 'desc',
        }
    },
    async mounted() {
        await this.sortBy();
    },
    methods: {
        async sortBy() {
            const response = await axios.get(`http://localhost:8000/api/products?sort_by=${this.selectedSortField}&order=${this.selectedSortOrder}`);
            this.products = response.data;
        }
    }
}
</script>
