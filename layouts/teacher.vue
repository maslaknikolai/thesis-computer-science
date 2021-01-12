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
              Учитель
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in teacherMenuItems"
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
  middleware: ['auth', 'teacherOnly'],

  data () {
    return {
      teacherMenuItems: [
        {
          icon: 'mdi-format-list-checkbox',
          title: 'Задания',
          to: '/teacher/tasks'
        },
        {
          icon: 'mdi-file-check',
          title: 'Работы',
          to: '/teacher/works'
        },
        {
          icon: 'mdi-account-group',
          title: 'Классы',
          to: '/teacher/classes'
        },
        {
          icon: 'mdi-account',
          title: 'Обучающиеся',
          to: '/teacher/students'
        }
      ]
    }
  }
}
</script>
