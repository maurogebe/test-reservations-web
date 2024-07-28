import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from './store'
import RoutesWrapper from "./views";
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  return (
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<ChakraProvider>
          	<RoutesWrapper />
					</ChakraProvider>
				</BrowserRouter >
			</PersistGate>
		</Provider>
  );
}

export default App;
