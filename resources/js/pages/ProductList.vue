<template>
    <div class="container product-list-page">
        <h1 class="mt-5">Product List</h1>
        <div class="product-list-nav mt-3 d-flex align-items-center flex-wrap">
            <div class="flex-shrink-1 d-flex">
                <select v-model="selectedPerPage" class="form-select me-2 mt-2" @change="changePerPage()">
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                </select>
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
            <button class="btn btn-secondary ml-auto mt-2" @click="showDeleted = !showDeleted">Show/Hide Marked as
                Deleted
            </button>
        </div>
        <div v-if="products">
            <div v-for="product in products" :key="product.id" class="product-list mt-3">
                <div v-if="showDeleted || !product.deleted" class="product-card">
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
            <nav v-if="pagination" class="mt-4">
                <ul class="pagination justify-content-center">
                    <li :class="['page-item', { 'disabled': !pagination.prev_page_url }]">
                        <a class="page-link" href="#" @click="loadPage(pagination.prev_page_url)">Previous</a>
                    </li>
                    <li v-for="page in pagination.last_page"
                        :key="page" :class="['page-item', { 'active': page === pagination.current_page }]">
                        <a class="page-link" href="#" @click="loadPage(page)">{{ page }}</a>
                    </li>
                    <li :class="['page-item', { 'disabled': !pagination.next_page_url }]">
                        <a class="page-link" href="#" @click="loadPage(pagination.next_page_url)">Next</a>
                    </li>
                </ul>
            </nav>
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
            selectedPerPage: '10',
            pagination: null,
        }
    },
    async mounted() {
        await this.loadPage(1);
    },
    methods: {
        async loadPage(page) {
            const response = await axios.get(`http://localhost:8000/api/products`, {
                params: {
                    page: page,
                    per_page: this.selectedPerPage,
                    sort_by: this.selectedSortField,
                    order: this.selectedSortOrder
                }
            });

            if (response.data) {
                console.log(response.data)
                this.products = response.data.data;
                this.pagination = response.data;
            }
        },
        async changePerPage() {
            await this.loadPage(1);
        }
    }
}
</script>
