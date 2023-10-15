import { Chart } from "chart.js";

const data = {
  React: 185134,
  Vue: 195514,
  Angular: 80460,
  Svelte: 57022,
  "Ember.js": 22165,
  "Backbone.js": 27862,
};

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number of GitHub Stars",
        data: Object.values(data),
      },
    ],
  },
});
