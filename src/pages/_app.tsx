import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NextNProgress
          color="#F44336"
          startPosition={0.1}
          showOnShallow
          options={{
            easing: "ease",
            speed: 1000,
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
