<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }" :key="routes.path" v-if="!routes.meta.link">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component v-if="!route.meta.link" :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <iframe-toggle />
  </section>
</template>

<script setup>
import iframeToggle from "../IframeToggle/index.vue";
import useTagsViewStore from "@/store/modules/tagsView";
import Cookies from "js-cookie";
import axios from "axios";
import { setStore, getStore } from '@/plugins/store'
const commonPath = import.meta.env.VITE_APP_PATH
const routes = useRoute();
const router = useRouter();

const token = ref('')
watch(routes, (route) => {
  const ticket = route.query.ticket;
  const href = window.location.href;
  const token = Cookies.get("gpyh_token"); //判断已过期
  console.log(token)
  if (!token) {
    if (!ticket) {
      window.microApp.dispatch({ name: "redirectToCAS", href });
    } else {
      verifyTicket(ticket, href);
    }
  }
});
onMounted(() => {
  window.microApp.addDataListener((dataListener) => {
    const commonPath = import.meta.env.VITE_APP_PATH
    console.log(dataListener)
    const { item } = dataListener
    if (item && item.url) {
      const path = item.url.slice(1).split('/').join('-')
      const url = `http://back.dev.gpyh.com${item.url}`
      useTagsViewStore().addIframeView({
        path: `${commonPath}/iframe/${path}`,
        name: path,
        meta: {
          title: item.name,
          link: url,
        }
      });
      router.push(`${commonPath}/iframe/${path}`)
    }
  })
  const menus = getStore({ name: 'menus' })
  if (menus) window.microApp.dispatch({ name: "getMenus", menus });
});
const getMenus = async (token) => {
  const { data } = await axios(
    {
      url: "http://192.168.2.218:8301/menu",
      headers: { 'Authorization': token || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDE2MjUiLCJleHAiOjE3MjA2MTQwMzR9.IHQPw179gSes8vxZDJ8oCj7nauyRg1a-PFtXqanheMw' }
    }
  );
  const menus = data.resultData
  setStore({
    name: 'menus',
    content: menus,
    type: 'local'
  })
  window.microApp.dispatch({ name: "getMenus", menus });
  const menusList = []
  menus.map(item => {
    item.children.map(citem => {
      citem.children.map(sitem => {
        const path = sitem.url.slice(1).split('/').join('-')
        const url = `http://back.dev.gpyh.com${sitem.url}`
        menusList.push({
          path: `${commonPath}/iframe/${path}`,
          name: path,
          meta: {
            title: sitem.name,
            link: url,
          }
        })
      })
    })
  })
}
const redirectToCAS = () => {
  const href = window.location.href;
  const casLoginUrl = `http://192.168.2.218:8087/login?service=${href}`;
  window.location.href = casLoginUrl;
};
const verifyTicket = async (ticket, service) => {
  try {
    const { data } = await axios.post(
      "http://192.168.2.218:8301/cas/login",
      { ticket, service } // 参数放在请求体中
    );
    token.value = data.resultData.token;
    // Save token to cookie
    Cookies.set("gpyh_token", token.value);
    // Cookies.set("gpyh_token", token, { domain: ".gpyh.com" });
    document.cookie = "gpyh_token=" + token.value + ";domain=.gpyh.com;path=/";
    await getMenus(token.value)
    router.replace(routes.path)
    // isVerifiedRef.current = true; // 设置为已验证
    // setIsVerified(true); // 更新状态
  } catch (error) {
    console.error("Ticket verification failed:", error);
  }
};
const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 134px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
