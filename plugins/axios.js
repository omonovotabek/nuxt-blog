export default function ({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    if (store.getters["auth/isAuthenticated"]) {
      const token = store.getters["auth/token"];
      request.headers.common["x-auth-token"] = token;
    }
    return request;
  });

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch("auth/logout");
        redirect("/admin/login?message=session");
      }
    }
  });
}
