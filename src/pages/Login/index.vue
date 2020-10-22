<template>
  <div class="login">
    <video
      muted="muted"
      src="../../../public/bg.mp4"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      class="bg_video"
    ></video>
    <div class="input">
      <h1 class="title">2020<br />全球总决赛</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密 码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Sign in</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../../api";
import { mapMutations } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到16位(字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        password: [{ validator: validatepassword, trigger: "blur" }],
        username: [{ validator: validateUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          login(this.ruleForm.username, this.ruleForm.password)
            .then(res => {
              loading.close();
              if (res.data.state) {
                this.$message.success("登入成功");
                localStorage.setItem("wf-token", res.data.token);
                localStorage.setItem(
                  "wf-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                this.SET_USERINFO(res.data.userInfo);
                this.$router.push("/Welcome");
              } else {
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  border: hidden;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
@font-face {
  font-family: "myfont";
  src: url(../../../public/fonts/font733/AaPrincessPeach.ttf);
}
.login .input {
  font-family: "myfont";
  z-index: 9;
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(182, 36, 92, 0.46);
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
video {
  width: 100%;
  height: 100%;
}
.login .input .title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
.login .input .el-form-item__label {
  padding: 0;
  color: #fff;
  font-size: 22px;
}

.login .input .el-input__inner {
  width: 80%;
  transition: all 0.5s;
  height: 40px;
  line-height: 100%;
  overflow: hidden;
  color: #fff;
  border: 0.04761905rem solid #fff;
  background: none;
  padding-left: 0.95rem;
  font-size: 0.1rem !important;
}
.login .input .el-button {
  width: 80%;
  font: 20px/20px "myfont";
  background: linear-gradient(90deg, #1cd8b9, #2ee40a);
}
.login .input .el-form-item__error {
  color: #6cf710;
  font-size: 16px;
}
</style>
