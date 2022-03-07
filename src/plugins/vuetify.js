import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            //Se definen colores globales para el tema claro
            light : {
                blueTodo:'#175EFB',   
                blueGrayTodo:'#6A83BE',   
                blueDarkTodo:'#2D52A8',
                bgTodo:'#F4F7FD',
            }
        }
    }
});
