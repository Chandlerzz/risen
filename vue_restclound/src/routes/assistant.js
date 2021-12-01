import Layout from "@/layouts/mainLayout";

// 公司管理
export default {
  path: "/assistant",
  name: "assistant",
  component: Layout,
  redirect: "noredirect",
  meta: {
    title: "助教管理",
    permissions: ["getAssistant"]
  },
  hidden: true,
  children: [
    {
      path: "addAssistant",
      name: "addAssistant",
      component: () => import("@/views/addAssistant"),
      meta: {
        title: "添加助教",
        permissions: ["addAssistant"]
      },
      hidden: true
    },
    {
      path: "showAssistant",
      name: "showAssistant",
      component: () => import("@/views/showAssistant"),
      meta: {
        title: "助教详情",
        permissions: ["getAssistant"]
      },
      hidden: true
    },
    {
      path: "editAssistant",
      name: "editAssistant",
      component: () => import("@/views/editAssistant"),
      meta: {
        title: "编辑助教",
        permissions: ["editAssistant"]
      },
      hidden: true
    },
    {
      path: "showAssistantList",
      name: "showAssistantList",
      component: () => import("@/views/showAssistantList"),
      meta: {
        title: "助教报表",
        permissions: ["editAssistant"]
      },
      hidden: true
    }
  ]
};
