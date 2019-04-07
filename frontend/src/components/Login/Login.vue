<template lang="pug">
  v-app
    v-container
      v-layout(align-center justify-center row fill-height)
        v-flex(xs12 sm7 md6 lg5 xl3)
          v-form(ref="form", @submit.prevent="logIn")
            v-card
              v-card-title
                a(href="/")
                  span.login__title sport
                  span.login__title.login__title--red events
              v-card-text
                v-text-field(
                  ref="login",
                  v-model="username",
                  append-icon="account_circle",
                  :rules="[v => !!v || 'Это обязательное поле']",
                  name="username",
                  label="Введите логин",
                  type="text",
                  required,
                  autofocus,
                  browser-autocomplete="off",
                  validate-on-blur)
                v-text-field(
                  ref="password",
                  v-model="password",
                  append-icon="lock",
                  :rules="[v => !!v || 'Это обязательное поле']",
                  name="password",
                  label="Введите пароль",
                  type="password",
                  browser-autocomplete="off",
                  required,
                  validate-on-blur).mb-4
                v-btn(
                  round
                  color="primary",
                  type="submit") Войти
          Notification
</template>

<script>
import Notification from '@/components/Common/Notiifcation/Notification'
export default {
  name: 'Login',
  components: { Notification },
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    logIn () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('LOGIN', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$refs.form.reset()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'Ocean';
    src: url('/static/fonts/Ocean.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  #app {
    background: #EDEEF0;
    .v-card {
      padding: 16px 32px;
      &__title {
        justify-content: center;
        a {
          text-decoration: none;
        }
      }
      border-radius: 10px;
      .v-btn--round {
        max-width: 130px;
        width: 100%;
        height: 40px;
      }
      .login__title {
        font-family: 'Ocean';
        font-size: 1.5rem;
        font-weight: 900;
        color: #504d49;
        &--red {
          color: #f6554d;
        }
      }
    }
  }
</style>
