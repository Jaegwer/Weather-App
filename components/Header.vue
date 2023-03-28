<template>
  <div class="header">
    <b-navbar type="dark" toggleable="md">
      <b-navbar-brand
        ><font-awesome-icon icon="fa-solid fa-bolt" />
        FlashForecast</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><font-awesome-icon icon="fa-solid fa-location-dot" />{{
              CurrentLocation
            }}</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-form href="#">
            <vue-typeahead-bootstrap

              v-model="search"
              :ieCloseFix="false"
              :data="locations"
              @hit="selecteduLocation = $event"
              placeholder="Search Location"
              @input="lookupLocation"
              />

            <b-button
              type="submit"
              variant="primary"
              @click.prevent="getWeather"
              ><font-awesome-icon
                icon="fa-solid fa-magnifying-glass" /></b-button
          ></b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            ><font-awesome-icon icon="fa-solid fa-calendar" />
            {{ currentDate }} / {{ currentTime }}</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from 'lodash/debounce';
export default {
  name: "Header",
  data() {
    return {
      currentDate: null,
      search: '',
      selectedLocation: null,
      locations: [],
      currentTime: "",
    };
  },
  computed: {
    ...mapGetters({
      CurrentLocation: "getCurrentLocation",
    }),
  },
  async mounted() {
    await this.$store.dispatch("fetchWeather");
    this.getCurrentDate();
  },
  methods: {
    async getWeather() {
      await this.$store.dispatch("searchWeather", this.search);
    },
    getCurrentDate() {
      const date = new Date();
      this.currentDate = date.toDateString();
      setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();
      }, 1000);
    },
	lookupLocation: debounce(function(){
      this.$axios.get(`https://api.openweathermap.org/data/2.5/find?q=${this.search}&type=like&sort=population&appid=${"7cb5e71f1a072157465d290b6274ff94"}`)
        .then(response => {
          console.log(response.data.list);
			this.locations = response.data.list.map((location)=>location.name)
			console.log(this.locations);
        })

    }, 500)
  },
};
</script>

<style lang="scss" scoped></style>
