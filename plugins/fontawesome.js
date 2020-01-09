import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleDown, faTimes, faPen, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleRight, faAngleDown, faTimes, faPen, faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)
