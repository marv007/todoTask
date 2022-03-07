<template>
  <v-app class="bgTodo">
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 lg4 xl3>            
            <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5">
              <p class="text-h5 pt-5 text-center blueGrayTodo--text ma-0">
                Register
              </p>             

              <v-form >
                <v-card-text>
                  <v-text-field
                    append-icon="mdi-account"
                    name="user"
                    label="Email *"
                    type="text"
                    v-model="user"
                    :rules="userRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                  </v-text-field>
                  <v-text-field
                    append-icon="mdi-account"
                    name="name"
                    label="Name *"
                    type="text"
                    v-model="name"
                    :rules="nameRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                  </v-text-field>
                  <v-text-field
                    append-icon="mdi-eye"
                    id="password"
                    name="password"
                    v-model="password"
                    label="Password *"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                    <template #append>
                      <v-icon
                        v-if="!showPassword"
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye</v-icon
                      >
                      <v-icon
                        v-else
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye-off</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-card-text>
                <v-card-text class="text-center justify-center pa-0">
                  <v-btn
                    
                    color="blueTodo white--text px-sm-8"
                    rounded                    
                    @click="registration()"
                    :loading="disabled"
                    >Sign Up</v-btn
                  >

                  
                </v-card-text>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-spacer class="my-10"></v-spacer>
  </v-app>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import jwtDecode from "jwt-decode";

export default {
  name: "register",
  data: () => ({
    error: false,
    error_message: null,
    isValid: false,
    user: null,    
    userRules: [(v) => (v !== null && v !== "") || "user not valid"],
    name: null,
    nameRules: [(v) => (v !== null && v !== "") || "name not valid"],
    password: null,
    passwordRules: [(v) => (v !== null && v !== "") || "password not valid"],
    showPassword: false,
    disabled: false,
  }),
  methods: {
    ...mapMutations(["setToken", "setUserInfo"]),
    ...mapActions("utils", ["clearMenu"]),
    async registration() {
      if (!this.user || !this.password) {
        return;
      }
      this.disabled = true;
      try {
        let data = {
          email: this.user,
          password: this.password,
          name: this.name
        };
        this.clearMenu();
        let response = await this.http_client("/api/custom-registration", data, "post");        
        
        if (response.status === 201) {          
          this.error = false;
          this.error_message = null;
          localStorage.setItem("token", response.data.id);
          localStorage.setItem("userInfo", response.data);
          localStorage.setItem("refresh_token", response.data);
          this.setToken(response.data.id);
          this.setUserInfo(response.data);           
          this.$router.push("/tasks/list").catch();
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
        if (e.response && e.response.status === 401) {
          this.error = true;
          this.error_message = e.response.data.message;
        }
      } finally {
        this.disabled = false;
      }
    },
    showAlert(message) {
      console.log(message);
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = "success";
      setTimeout(() => {
        this.ocultarAlert();
      }, 2000);
    },
    ocultarAlert() {
      this.alert.show = !this.alert.show;
    },
  },
};
</script>

<style scoped></style>
