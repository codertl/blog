import { defineStore } from 'pinia'

export const counterStore = defineStore('counter', {
  state() {
    return {
      count: 0 as number
    }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
