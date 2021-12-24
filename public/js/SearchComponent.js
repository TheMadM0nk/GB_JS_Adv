Vue.component('search-form', {
   data() {
      return {
         userSearch: '',
         showSearch: false
      }
   },
   template: `
         <div class="search-form" >
            <img @click="showSearch=!showSearch" src="img/search.svg" alt="search">
            <form class="search-box" action="#" v-if="showSearch" method="post" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">Search</button>
            </form>
         </div>`
});