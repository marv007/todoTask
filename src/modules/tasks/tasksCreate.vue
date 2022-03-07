<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-2 pa-sm-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayTodo--text"
        >
          Create task
          <v-icon color="blueGrayTodo">mdi-plus</v-icon>
        </v-card-title>
        
        
            <v-card-text>
              <v-text-field
                label="Title"
                type="text"
                color="blueTodo"
                v-model="title"
                :rules="titleRules"
              ></v-text-field>
              <v-text-field
                label="Prority"
                color="blueTodo"
                type="text"                
                v-model="priority"
                :rules="priorityRules"
              ></v-text-field>
              <v-text-field
                label="Description"
                color="blueTodo"
                type="text"                
                v-model="description"
                :rules="descriptionRules"
              ></v-text-field>
              
            </v-card-text>
          
            
          
        <v-card-actions>
          <v-row class="pa-0 ma-0">
            <v-col class="pa-0">
              <v-btn
                color="blueTodo"
                class="white--text ma-1"
                rounded
                @click="postTask(true)"
                :small="$vuetify.breakpoint.xs"
              >
                <v-icon left>mdi-content-save</v-icon>
                Save</v-btn
              >
              
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card></v-flex
    ></v-container
  >
</template>
<script>
export default {
  name: "taskCreate",
  data: () => ({
    title: null,
    priority: null,
    description: null,
    usuario: null,
    perfiles: [],
    perfilesSelect: [],
    rolesSelect: [],
    roles: [],
    dui: null,
    tab: null,
    password: null,
    token: localStorage.getItem("token"),
  }),
  methods: {    
    async postTask(navigate = false) {    
      
      try {
        const response = await this.http_client(
          "/api/tasks",
          {
            user_id: this.token.trim(),
            title: this.title.trim(),
            priority: this.priority.trim(),
            description: this.description,            
          },
          "post"
        );
        this.temporalAlert({
          show: true,
          message: "Task created successfull",
          type: "success",
        });
        this.usuario = null;
        this.password = null;
        if (navigate) {
          this.$router.push("/tasks/list");
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "error",
        });
      }
    },
  },
  computed: {
    titleRules() {
      return [
        (v) => (v !== null && v !== "") || "Title is requiered",
        
      ];
    },
    priorityRules() {
      return [
        (v) => (v !== null && v !== "") || "Priority is requiered",
        
      ];
    },
    descriptionRules() {
      return [
        (v) => (v !== null && v !== "") || "Description is requiered",
        
      ];
    },
    
  },
  async created() {
    
  },
};
</script>
