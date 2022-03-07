<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>
      <v-card class="pa-4" rounded="lg">
        <v-card-title
          primary-title
          class="d-flex justify-space-between blueGrayTodo--text"
        >
          Tasks
          <div>
            
            <v-btn
              rounded
              color="blueTodo"
              class="white--text ma-1"
              @click="$router.push('create')"
              ><v-icon left>mdi-plus</v-icon>Add</v-btn
            >
          </div>
        </v-card-title>
        
        <v-card-text>
          <v-skeleton-loader v-if="loading == true"></v-skeleton-loader>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="tasks"
            :single-select="false"
            item-key="id"
            show-select
            class="elevation-0 border-1"
            no-data-text="No hay datos"
            no-results-text="No hay resultados"
            :footer-props="{
              'items-per-page-options': [5, 10, 20],
              'items-per-page-text': 'Rows',
              'page-text': '',
            }"
            v-if="tasks.length > 0"
          >
            <template v-slot:[`item.last_login`]="{ item }">
              {{ item.last_login | moment("DD/MM/YYYY") }}
            </template>
            <template v-slot:[`item.is_suspended`]="{ item }">
              <v-chip
                class="ma-2 white--text"
                color="blueTodo"
                small
                v-if="item.is_suspended"
              >
                Si
              </v-chip>
              <v-chip
                class="ma-2 white--text"
                color="red darken-1"
                v-else
                small
              >
                No
              </v-chip>
            </template>
            <template v-slot:[`item.accion`]="{ item }">
              <v-btn icon small @click="showtaskData(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
              <v-btn icon small @click="editingTask(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
            </template>
            <template v-slot:[`body.append`]>
              <v-expand-transition>
                <div v-show="selected.length > 0">
                  <tr>
                    <td class="px-2">
                      <v-btn
                        color="blueTodo"
                        text
                        rounded
                        icon
                        @click="deleteTasks()"
                        ><v-icon color="red darken-1"
                          >mdi-trash-can</v-icon
                        ></v-btn
                      >
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </div>
              </v-expand-transition>
            </template>
          </v-data-table>
          <v-alert
            color="blueTodo"
            icon="mdi-information"
            prominent
            text
            v-else
          >
            No data found</v-alert
          >
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="taskModal"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg" max-height="700px">
        <v-card-title primary-title> Task Details: </v-card-title>
        <v-card-text>
          <span class="font-weight-bold">Title</span>
          <v-spacer></v-spacer>
          {{ taskData ? taskData.title : null }}
          <v-spacer></v-spacer>
          
          <span class="font-weight-bold">Priority</span>
          <v-spacer></v-spacer>
          {{ taskData ? taskData.priority : null }}
          <v-spacer></v-spacer>
          
          <span class="font-weight-bold">Description</span>
          <v-spacer></v-spacer>
          {{ taskData ? taskData.description : null }}
          <v-spacer></v-spacer>
          
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tasks: [],
    selected: [],
    loading: false,    
    taskModal: false,
    taskData: null,
    token: localStorage.getItem("token"),
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      {
        text: "Priority",
        align: "start",
        sortable: false,
        value: "priority",
      },
      
      { text: "Options", value: "accion", sortable: false, width: "100" },
    ],
  }),
  methods: {   
    async getTasks(filtros = null) {
      try {
        this.loading = true;
        const response = await this.http_client(`/api/tasks/${this.token}`);
        this.tasks = response.data;        
        this.loading = false;
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.message,
          type: "warning",
        });
      }
    },
    editingTask(item) {      
      localStorage.setItem(
        "editingTask",
        JSON.stringify({
          id: item.id,
          user_id : item.user_id,
          title : item.title,
          priority : item.priority,
          description : item.priority
        })
      );
      this.$router.push(`edit/${item.id}`);
    },
    showtaskData(item) {
      this.taskModal = true;
      this.taskData = item;
    },
    async deleteTasks() {
      const tasks = this.selected.map((task) => {
        return task.id;
      });
      const response = await this.http_client(
        "/api/delete-task",
        { id: tasks },
        "delete"
      );
      this.temporalAlert({
        show: true,
        message: "Task deleted",
        type: "success",
      });
      this.selected = [];
      this.getTasks();
    },
  },
  computed: {
    
    
  },
  async mounted() {    
    await this.getTasks();
  },
};
</script>
