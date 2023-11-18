<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img class="logo_image" src="../../assets/image/1.png" alt="">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form">
        <el-form-item>
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" prefix-icon="el-icon-notebook-2" type="password"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.loginForm.username = '';
      this.loginForm.password = '';
    },
    login() {
      this.$http.get('login',{params:{username:this.loginForm.username,password:this.loginForm.password}}).then((res)=>{
        const code = res.data.code;
        if(code === 1){
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token",code);
          this.$router.push('/');
        }else {
          this.$message.error("登录失败")
        }
      })
      // if ((this.loginForm.username === 'admin') && (this.loginForm.password === '123456zzw')) {
      //   this.$router.push('/')
      // } else {
      //   this.$message({
      //     message: '登录失败，请重新输入！',
      //     type: 'error'
      //   });
      //   this.resetLoginForm();
      // }

    }

  }

}
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}

.logo_image {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.buttons {
  display: flex;
  justify-content: flex-end;

}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>
