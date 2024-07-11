const commonPath = import.meta.env.VITE_APP_PATH

class iframeData{
  constructor(list:[]){
    this.list = list;
  }
  
  getIframeList(){
    return[
      {
        fullPath:`${commonPath}/iframe/brand-list`,
        path:`${commonPath}/iframe/brand-list`,
        name:"brand-list",
        meta:{
          title:"品牌维护",
          link:'http://back.dev.gpyh.com/brand/list',
        }
      },
      {
        fullPath:`${commonPath}/iframe/category-goodsType`,
        path:`${commonPath}/iframe/category-goodsType`,
        name:"category-goodsType",
        meta:{
          title:"品牌分类",
          link:'http://back.dev.gpyh.com/category/goodsType',

        }
      },
      {
        fullPath:`${commonPath}/iframe/standard-list`,
        path:`${commonPath}/iframe/standard-list`,
        name:"standard-list",
        meta:{
          title:"商品标准",
          link:'http://back.dev.gpyh.com/standard/list',

        }
      }
    ]
  }
}
export default iframeData