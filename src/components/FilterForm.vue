<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="filterProducts"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            placeholder="0"
            v-model.number="filters.inputPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            placeholder="12345"
            v-model.number="filters.inputPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model="filters.inputSelectCategory"
          >
            <option :value="null">Все категории</option>
            <option
              :value="category.id"
              v-for="category of categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="color of colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="checkbox"
                name="color"
                :value="color.id"
                v-model="filters.inputColors"
              />
              <span
                class="colors__value"
                :style="{ backgroundColor: color.code }"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="material of materials"
            :key="material.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
                v-model="filters.inputMaterials"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="season of seasons"
            :key="season.id"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.id"
                v-model="filters.inputSeasons"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <BaseButton class="filter__submit" text="Применить" />

      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="resetFilter"
        v-if="filterFieldsNotEmpty"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'FilterForm',
};
</script>

<script setup>
const $store = useStore();

const filters = computed(() => $store.getters['filters/filters']);
const materials = computed(() => $store.getters['filters/materials']);
const seasons = computed(() => $store.getters['filters/seasons']);
const categories = computed(() => $store.getters['filters/categories']);
const colors = computed(() => $store.getters['filters/colors']);

const filterFieldsNotEmpty = computed(() =>
  Object.values(filters.value).some((filter) => {
    if (Array.isArray(filter)) {
      return filter.length;
    }
    return filter;
  })
);

const getMaterials = () => $store.dispatch('filters/loadMaterialsData');
const getSeasons = () => $store.dispatch('filters/loadSeasonsData');
const getCategories = () => $store.dispatch('filters/loadCategoriesData');
const getColors = () => $store.dispatch('filters/loadColorsData');
const filterProducts = () => $store.dispatch('products/loadProductsData');

const resetFilter = () => {
  $store.commit('filters/resetFilter');
  filterProducts();
};

onMounted(() => {
  getMaterials();
  getSeasons();
  getCategories();
  getColors();
});
</script>
