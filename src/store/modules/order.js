import api from "../../api";

const state = () => ({
  orderData: null,
});

const getters = {
  orderData(state) {
    return state.orderData;
  },
  productsInCart(state, getters, rootState) {
    if (state.orderData?.basket?.items) {
      return state.orderData.basket.items;
    }
    return rootState.cart.basketData;
  },
  orderProducts(state) {
    return state.orderData.basket.items;
  },

  orderNumberProducts(state) {
    return state.orderData?.basket?.items.length;
  },

  totalOrderNumberProducts(state) {
    return state.orderData?.basket?.items.reduce((prev, current) => prev + current?.quantity, 0);
  },

  orderTotalPrice(state) {
    return Number(state.orderData.totalPrice) + Number(state.orderData.deliveryType.price);
  },

  orderDeliveryPrice(state) {
    return state.orderData.deliveryType.price;
  },
};

const mutations = {
  saveOrderData(state, response) {
    state.orderData = response;
  },
};

const actions = {
  postOrder(context, { name, address, phone, email, deliveryTypeId, paymentTypeId, comment }) {
    return api
      .postOrder({
        userAccessKey: context.rootState.accessKey,
        name,
        address,
        phone,
        email,
        deliveryTypeId,
        paymentTypeId,
        comment,
      })
      .then((response) => {
        context.commit("saveOrderData", response.data);
        return response;
      });
  },

  loadOrderInfo(context, id) {
    return api
      .loadOrderInfo({ userAccessKey: context.rootState.accessKey, id })
      .then((response) => {
        context.commit("saveOrderData", response.data);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
