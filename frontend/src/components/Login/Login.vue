<template lang="pug">
  v-app
    v-container
      v-layout(align-center justify-center row fill-height)
        v-flex(xs12 sm7 md6 lg5 xl3)
          v-form(ref="form", @submit.prevent="logIn")
            v-card
              v-card-title
                h3(class="display-1") Админка
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
  #app {
    background: #000428;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    .v-card {
      padding: 16px 32px;
      &__title {
        justify-content: center;
      }
      border-radius: 10px;
      .v-btn--round {
        max-width: 200px;
        width: 100%;
        height: 45px;
      }
    }
  }
</style>
