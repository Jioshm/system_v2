<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="200">
        <div class="header"></div>
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 :router="true"
                 :collapse="isCollapse">
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <div class="grid-content">
            <i
              class="iconfont icon-shouqi"
              @click="isCollapse = !isCollapse"
            ></i>
          </div>
          <div class="header-middle" style="font-size:32px;color:#fff">千 锋 管 理 系 统</div>
          <div class="header-right">
            <div class="grid-content">
              <el-avatar
                :size="40"
                fit="fit"
                src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"
              ></el-avatar>
              <span
                >欢迎您:<b class="nickname">{{ userInfo.nickname }}</b></span
              >
              <span class="quit" @click="quit">退出</span>
            </div>
          </div>
        </el-header>
        <!-- 主体区域 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:crumb.path}"
                                v-for="crumb in crumbs" >
              {{crumb.meta.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "../../api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapState(['userInfo', 'menuList', 'crumbs'])
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      localStorage.removeItem("wf-token");
      localStorage.removeItem("wf-userInfo");
      this.$router.push("/login");
      window.location.reload();
    }
  }
};
</script>
<style scoped>
.home-page {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 500px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}
.el-submenu__title {
    font-size: 18px;
    color: rgb(213, 230, 233);
}
.el-aside {
  background-color: #303d53;
  /* color: #333; */
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}
.el-menu{
  background-color: rgb(196, 214, 211);
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(90deg, #1cd8b9, #356dd4);
}
.quit {
  cursor: pointer;
  color: rgb(182, 15, 23);
  font-size: 24px;
}
.el-avatar {
  vertical-align: -12px;
}
.grid-content span:nth-child(2) {
  padding: 15px;
}
.icon-shouqi {
  color: rgb(107, 110, 129);;
  font-size: 35px;
  cursor: pointer;
}
.header {
  height: 60px;
  background: linear-gradient(135deg, #4c67ff, #5635df);
  background-image: url(../../assets/imgs/logo.be8bbddf.png);
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-position-x: 50%;
  background-position-y: center;
}
</style>
