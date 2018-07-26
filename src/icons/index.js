import Vue from 'vue'
import Icon from '@/components/Icon/Icon'

Vue.component('icon', Icon)

/* eslint-disable */
~function (requireContext) {
    return requireContext.keys().map(requireContext)
}(require.context('./svg', false, /\.svg$/))
