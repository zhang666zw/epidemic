<template>
  <div class="layout">
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <div class="content" :class="{small:isCollapse}">
      <Header @changeShow="changeShow" :isCollapse="isCollapse"></Header>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Menu from './AsideMenu.vue'
import Header from "./Header.vue";
export default {
  data(){
    return{
      isCollapse:false
    }
  },
  components:{
    Header,
    Menu,
  },
  methods:{
    changeShow(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.layout{
    //display: flex;
    .menu{
      //width: 200px;
      background: #112f50;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
    }
    .content{
      padding-left: 200px;
    }
    .small{
      padding-left: 64px;
    }

}

</style>
