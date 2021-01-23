<template>
  <v-app dark>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $store.state.auth.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Класс:
              {{ $store.state.auth.user.schoolClass.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in studentMenuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title>
        Информатика
      </v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        @click="$auth.logout()"
      >
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth', 'studentOnly'],

  data () {
    return {
      studentMenuItems: [
        {
          icon: 'mdi-format-list-checkbox',
          title: 'Задания',
          to: '/student/tasks'
        },
        {
          icon: 'mdi-book-open-page-variant-outline',
          title: 'Уроки',
          to: '/student/lessons'
        }
      ]
    }
  }
}
</script>
