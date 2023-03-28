import Vuex from "vuex";

const API_KEY = "7cb5e71f1a072157465d290b6274ff94";

const store = () => {
  return new Vuex.Store({
    state: {
      current_location_weather: [],
      current_location: "",
      wanted_weather: "",
	  cities: [],
	  capital_cities: [],

    },
    getters: {
      getCurrentLocationWeather(state) {
        return state.current_location_weather;
      },
      getCurrentLocation(state) {
        return state.current_location;
      },
      getWantedWeather(state) {
        return state.wanted_weather;
      },
	  getCities(state){
		return state.cities;
	  },
	  getCapitalCities(state){
		return state.capital_cities;
	  },

    },
    mutations: {
      setWeather(state, { current_location_weather }) {
        state.current_location_weather = current_location_weather;
      },
      setLocation(state, { current_location }) {
        state.current_location = current_location;
      },
      setWantedWeather(state, { wanted_weather }) {
        state.wanted_weather = wanted_weather;
      },
	  setCities(state,{cities}){
		state.cities = cities
	  },
	  setCapitalCities(state,{capital_cities}){
		state.capital_cities = capital_cities
	  },

    },
    actions: {
      async fetchWeather({ commit, state }) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          this.$axios.get(url).then((response) => {
            console.log(response.data);
            console.log(state.current_location_weather);
            state.current_location = response.data.timezone;
            console.log(state.current_location);
            state.current_location_weather = [];
            const location_weather = state.current_location_weather;
            location_weather.push(...response.data.daily);
            console.log(location_weather);
            console.log(state.current_location_weather);
          });
        });
      },
      async searchWeather({ commit,state }, search) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;
		this.$axios.get(url).then((response)=>{
			console.log(response.data);
			state.wanted_weather = response.data
			console.log(state.wanted_weather);
		})

      },
	  async fetchCities({commit, state}, query){
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`;
		this.$axios.get(url).then((response)=>{
			state.cities = response.data.list.map((city)=>city.name)
		})
	  },
	  async fetchCapitalCities({commit, state},cities){
		const promises = cities.map(city =>{
			return this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
		})
		const res = await Promise.all(promises)
		const capital = res.map(res => res.data)
		console.log(capital);
		state.capital_cities.push(capital)

	  },
    },
  });
};

export default store;
