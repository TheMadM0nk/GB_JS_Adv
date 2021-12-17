Vue.component('error-msg', {

    template:
        `<div v-if="$parent.error" class="errorBgnd">
            <div class='errorBox'>
                <h3>Ошибка загрузки JSON файла!<br>(Смотреть main.js строка 75!)</h3>
            </div>
        </div>`
})