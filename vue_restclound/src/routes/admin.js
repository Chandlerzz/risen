import Layout from "@/layouts/mainLayout";

// 公司管理
export default {
  path: "/admin",
  name: "admin",
  component: Layout,
  redirect: "noredirect",
  meta: {
    title: "职员管理",
    permissions: ["getAdmin"]
  },
  hidden: true,
  children: [
    {
      path: "addAdmin",
      name: "addAdmin",
      component: () => import("@/views/addAdmin"),
      meta: {
        title: "添加职员",
        permissions: ["addAdmin"]
      },
      hidden: true
    },
    {
      path: "showAdmin",
      name: "showAdmin",
      component: () => import("@/views/showAdmin"),
      meta: {
        title: "职员详情",
        permissions: ["getAdmin"]
      },
      hidden: true
    },
    {
      path: "editAdmin",
      name: "editAdmin",
      component: () => import("@/views/editAdmin"),
      meta: {
        title: "编辑职员",
        permissions: ["editAdmin"]
      },
      hidden: true
    }
  ]
};
