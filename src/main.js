import { createApp } from 'vue'
import App from './App.vue'

let bookedDays = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [3, 4, 5, 14, 15, 22, 23, 24, 27, 28],
    8: [18, 19, 20, 21, 6, 7],
    9: [],
    10: [],
    11: [],
    12: []
}
createApp(App).provide('booked', bookedDays).mount('#app')