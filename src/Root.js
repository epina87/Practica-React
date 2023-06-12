import { Provider } from "react-redux";
import { RouterProvider as Router } from "react-router-dom";

export default function Root({ store, router,children }) {
  return (
    <Provider store={store}>
      <Router router={router}/>
    </Provider>
  );
}
