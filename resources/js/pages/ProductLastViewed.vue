<template>
    <div class="container product-list-page">
        <h1 class="mt-5">Last Viewed Products</h1>
        <div class="product-list-nav mt-3 d-flex align-items-center">
            <button @click="removeAllViewed" class="btn btn-secondary ml-auto">Clear Last Viewed
            </button>
        </div>
        <div v-if="lastViewed.length">
            <div class="product-list mt-3" v-for="product in lastViewed" :key="product.id">
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
        <div v-else class="mt-3">
            <div class="alert alert-info" role="alert">
                No products in the last viewed list.
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['lastViewed'])
    },
    methods: {
        ...mapMutations(['removeAllViewed'])
    }
}
</script>
