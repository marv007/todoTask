<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayTodo--text"
        >
          Edit task
          <v-icon color="blueGrayTodo">mdi-pencil</v-icon>
        </v-card-title>
         <v-card-text>
              <v-text-field
                label="Title"
                type="text"
                color="blueTodo"
                v-model="task.title"
                :rules="titleRules"
              ></v-text-field>
              <v-text-field
                label="Prority"
                color="blueTodo"
                type="text"                
                v-model="task.priority"
                :rules="priorityRules"
              ></v-text-field>
              <v-text-field
                label="Description"
                color="blueTodo"
                type="text"                
                v-model="task.description"
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
                @click="putTask()"
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
  name: "taskEdit",
  data: () => ({
    task : {title:null, priority: null, description:null},
    
  }),
  methods: {   
    async putTask() {
      const id = this.$route.params.id;
      
      const response = await this.http_client(
        `/api/update-task`,
        {
          id,
          user_id: this.task.user_id,
          title: this.task.title,
          priority: this.task.priority,
          description: this.task.description
        },
        "put"
      );
      this.temporalAlert({
        show: true,
        message: "Task updated",
        type: "success",
      });
      this.$router.push("/tasks/list");
      localStorage.removeItem("editingTask");
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
    this.editingTask = JSON.parse(localStorage.getItem("editingTask"));
    if (this.editingTask) {
      if (this.editingTask.id == this.$route.params.id) {
        
        this.task = this.editingTask;
        
      } else {
        this.$router.push("/tasks/list");
      }
    } else {
      this.$router.push("/tasks/list");
    }
  },
};
</script>
