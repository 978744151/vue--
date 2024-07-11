import { getStore } from '@/plugins/store'
import './index.scss'
import useTagsViewStore from "@/store/modules/tagsView";
import axios from "axios";
import Cookies from "js-cookie";

const commonPath = import.meta.env.VITE_APP_PATH

export default defineComponent({
  setup(props, ctx) {
    const menus = ref([])
    const router = useRouter();
    onMounted( () => {
      if( Cookies.get("gpyh_token")){
        getList()
      }
    })
    const getList = async() =>{
      await axios({
          url: "http://192.168.2.218:8301/menu",
          headers: { 'Authorization':  Cookies.get("gpyh_token")  }
      }).then(({data})=>{
        menus.value = data.resultData
      })
    }
    const routerLink = (item) =>{
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
    return {
      menus,
      routerLink,
    }
  },
  render() {
    const {routerLink} = this
    return   <div class="main-menu-gbox">
    {/* <Input placeholder="请输入菜单" onChange={(e)=>handleSearchMenu(e)}/> */}
    {  this.menus &&  this.menus.length  > 0 && this.menus.map(item=>{
      return (
        <div key={item.id} class="main-menu-gbox-item"><span class="main-menu-gbox-item-name">{item.name}</span>
          <div class="main-menu-gbox-item-right">{ item && item.children.map(citem=>
            (<div key={citem.id}> <span  class="main-menu-gbox-item-right-tag">{citem.name} </span>
                <div >{ citem && citem.children.map(sitem=> (<span class="main-menu-gbox-item-right-name"  key={sitem.id} onClick={()=>routerLink(sitem)}> {sitem.name} </span>)) }</div>
            </div>)
          )}</div>
        </div> 
      )
    })}
  </div>
  },
})
