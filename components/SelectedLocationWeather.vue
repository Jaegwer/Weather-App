<template>
  <div class="row mt-5 selected-location">
    <div class="col-9">
      <h3>The Location You Searched</h3>
      <div class="row mt-5 d-flex justify-content-around">
        <div class="col-lg-4 col-xl-2 col-md-4">
          <div class="row">
            <div v-if="WantedWeather" class="card col">
              <div class="card-header">
                <h4>{{ WantedWeather.name }}</h4>
              </div>
              <div
                class="card-body d-flex justfiy-content-around align-items-center"
              >
                <h4>{{ Math.floor(WantedWeather.main.temp) }}°C</h4>
                <img
                  :src="
                    WantedWeather.weather[0].main === 'Rain'
                      ? require('~/assets/gifs/rainy.gif')
                      : WantedWeather.weather[0].main === 'Snow'
                      ? require('~/assets/gifs/snowy.gif')
                      : WantedWeather.weather[0].main === 'Thunderstorm'
                      ? require('~/assets/gifs/thunder.gif')
                      : WantedWeather.weather[0].main === 'Clouds'
                      ? require('~/assets/gifs/cloudy.gif')
                      : WantedWeather.weather[0].main === 'Drizzle'
                      ? require('~/assets/gifs/drizzle.gif')
                      : require('~/assets/gifs/default.gif')
                  "
                  alt=""
                />
              </div>
              <div class="card-footer">
                <p>
                  You can read detailed weather forecast from our newsreader
                </p>
              </div>
            </div>
            <div v-else class="card col">
              <div class="card-header">
                <h4>
                  No Data
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                </h4>
              </div>
              <div class="card-body">
                <h4>
                  No Data
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div v-if="WantedWeather" class="col-lg-6  col-md-8 forecast-section">
          <div class="row">
            <div class="col-2">
              <img src="../assets/gifs/speaker.gif" alt="" />
            </div>
            <div class="col-10 line-up">
              <p>
                Hello, I am your virtual newsreader. Today weather is
                {{ WantedWeather.weather[0].description }} in
                {{ WantedWeather.name }} and wind speed is
                {{ WantedWeather.wind.speed }} km/h. Our expectations for
                temperature are maximum:
                {{ Math.floor(WantedWeather.main.temp_max) }} °C and minimum:
                {{ Math.floor(WantedWeather.main.temp_min) }} °C. Have a nice
                day.
              </p>
            </div>
          </div>
        </div>
        <div v-else class="col-lg-6 col-md-8 forecast-section">
          <div class="row">
            <div class="col-2">
              <img src="../assets/gifs/speaker.gif" alt="" />
            </div>
            <div class="col-10 line-up">
              <p>Please search a location for detailed weather forecast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <h3>Capital Cities</h3>
      <div class=" capital-cities">
        <div class="city-card" v-for="capitalCity in capitalCities[0]" :key="capitalCity.name">
          <div class="card  mt-3">
            <div
              class="card-body d-flex justify-content-around  align-items-center"
            >
              <div>
                <h4>
                  {{ capitalCity.name }}
                </h4>
                <p>
                  {{ capitalCity.weather[0].description }}
                </p>
              </div>
              <div>
                <img
                  :src="
                    capitalCity.weather[0].main === 'Rain'
                      ? require('~/assets/gifs/rainy.gif')
                      : capitalCity.weather[0].main === 'Snow'
                      ? require('~/assets/gifs/snowy.gif')
                      : capitalCity.weather[0].main === 'Thunderstorm'
                      ? require('~/assets/gifs/thunder.gif')
                      : capitalCity.weather[0].main === 'Clouds'
                      ? require('~/assets/gifs/cloudy.gif')
                      : capitalCity.weather[0].main === 'Drizzle'
                      ? require('~/assets/gifs/drizzle.gif')
                      : require('~/assets/gifs/default.gif')
                  "
                  alt=""
                />
                <h4>{{ Math.floor(capitalCity.main.temp) }}°C</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SelectedLocationWeather",
  computed: {
    ...mapGetters({
      WantedWeather: "getWantedWeather",
      capitalCities: "getCapitalCities",
    }),
  },
  created() {
    this.$store.dispatch("fetchCapitalCities", [
      "London",
      "Paris",
      "Washington",
      "Rome",
      "Moscow",
    ]);
  },
};
</script>

<style lang="scss" scoped></style>
