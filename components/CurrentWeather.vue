<template>
  <div class="current-weather mt-5">
    <h3>Next 7 Days</h3>
    <div class="mt-3">
      <div class="row d-flex justify-content-around">
        <div v-for="(CurrentLocationWeather, index) in CurrentLocationWeathers" :key="index" @mouseover="showElement(index)" @mouseleave="hideElement(index)">
          <div class="card col">
            <div class="card-header">
				<h4>{{ convertUnixTimeToWeekday(CurrentLocationWeather.dt) }}</h4>

            </div>
            <div class="card-body d-flex justify-content-around align-items-center">
				<h4>
					{{ Math.floor(CurrentLocationWeather.temp.day) }}°C
				</h4>
              <img
                :src="
                  CurrentLocationWeather.weather[0].main === 'Rain'
                    ? require('~/assets/gifs/rainy.gif')
                    : CurrentLocationWeather.weather[0].main === 'Snow'
                    ? require('~/assets/gifs/snowy.gif')
                    : CurrentLocationWeather.weather[0].main === 'Thunderstorm'
                    ? require('~/assets/gifs/thunder.gif')
                    : CurrentLocationWeather.weather[0].main === 'Clouds'
                    ? require('~/assets/gifs/cloudy.gif')
                    : CurrentLocationWeather.weather[0].main === 'Drizzle'
                    ? require('~/assets/gifs/drizzle.gif')
                    : require('~/assets/gifs/default.gif')
                "
                alt=""
              />
            </div>
			<div v-if="show[index]" class="card-footer">
				<p><font-awesome-icon icon="fa-solid fa-droplet" />Humidity:{{ CurrentLocationWeather.humidity }}%</p>
				<p><font-awesome-icon icon="fa-solid fa-wind" />Wind Speed:{{ CurrentLocationWeather.wind_speed }}km/h</p>
				<p><font-awesome-icon icon="fa-solid fa-lungs" />Pressure:{{ CurrentLocationWeather.pressure }}MB</p>

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
  name: "CurrentWeather",
  data(){
	return{
		show:{}
	}
  },
  computed: {
    ...mapGetters({
      CurrentLocationWeathers: "getCurrentLocationWeather",
      WeatherDate: "getWeatherDate",
    }),
  },
  async mounted() {
    await this.$store.dispatch("fetchWeather");

  },
  methods: {
    convertUnixTimeToWeekday(unixTime) {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(unixTime * 1000);
      const dayOfWeekIndex = date.getDay();
      return daysOfWeek[dayOfWeekIndex];
    },
	showElement(index) {
      this.$set(this.show, index, true);
    },
    hideElement(index) {
      this.$set(this.show, index, false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
