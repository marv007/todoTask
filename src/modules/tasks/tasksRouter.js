export const tasksRouter =
{
    path: "tasks",
    name: "tasks",
    component: () =>
        import(
        /* webpackChunkName: "tasks" */ "./tasks.vue"
        ),
    children: [
        {
            path: "list",
            name: "tasksList",
            component: () =>
                import(
            /* webpackChunkName: "tasksList" */ "./tasksList.vue"
                ),
        },
        {
            path: "create",
            name: "tasksCreate",
            component: () =>
                import(
            /* webpackChunkName: "tasksCreate" */ "./tasksCreate.vue"
                ),
        },
        {
            path: "edit/:id",
            name: "tasksEdit",
            component: () =>
                import(
            /* webpackChunkName: "tasksEdit" */ "./tasksEdit.vue"
                ),
        },
    ],
}