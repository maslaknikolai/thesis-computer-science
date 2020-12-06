<template>
  <div>
    Варианты:

    <v-input
      v-if="errors && errors.errors"
      :error-messages="errors.errors"
      class="my-2"
    />

    <v-layout
      v-for="(option, optionIndex) in options"
      :key="option.uuid"
      wrap
      align-center
      class="pa-2"
    >
      <v-text-field
        v-model="options[optionIndex].text"
        :error-messages="errors && errors[`${optionIndex}`] ? errors[`${optionIndex}`].text : null"
        label="Вариант ответа"
        class="mr-2"
      />

      <v-checkbox
        v-model="options[optionIndex].isCorrect"
        :error-messages="errors && errors[`${optionIndex}`] ? errors[`${optionIndex}`].isCorrect : null"
        label="Правильный"
        class="mr-2"
      />

      <v-btn
        icon
        small
        @click="removeOption(optionIndex)"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-layout>

    <v-btn
      outlined
      small
      @click="addOption()"
    >
      Добавить вариант
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-divider class="my-2" />
  </div>
</template>

<script>
import createOption from './createOption'

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    errors: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    addOption () {
      this.options.push(createOption())
    },
    removeOption (optionIndex) {
      this.options.splice(optionIndex, 1)
    }
  }
}
</script>
