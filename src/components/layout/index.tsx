// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Configurator from '../template/Configurator/Configurator';
import Footer from '../template/Footer/Footer';
// Layout components
import AdminNavbar from '../template/Navbars/AdminNavbar.js';
import Sidebar from '../template/Sidebar';
import { useState } from 'react';
import { Outlet, Route } from 'react-router-dom';
import routes from '../../routes';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from '../theme/theme';
import FixedPlugin from '../template/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../template/Layout/MainPanel';
import PanelContainer from '../template/Layout/PanelContainer';
import PanelContent from '../template/Layout/PanelContent';

export default function Dashboard(props: any) {

	const { ...rest } = props;

	// states and functions
	const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
	const [ fixed, setFixed ] = useState<boolean>(false);

	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};

	const getActiveRoute = (routes: any): any => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};

	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes: any): any => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};

	const getRoutes = (routes: any) => {
		return routes.map((prop: any, key: any) => {
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			} else {

				return <Route path={prop.path} key={key} />;
			}
			return null
				// return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
		});
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	// Chakra Color Mode
	return (
		<ChakraProvider theme={theme} resetCSS={false}>
			<Sidebar
				routes={routes}
				logoText={'PURITY UI DASHBOARD'}
				display='none'
				sidebarVariant={sidebarVariant}
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<AdminNavbar
						onOpen={onOpen}
						logoText={'PURITY UI DASHBOARD'}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixed}
						{...rest}
					/>
				</Portal>
				<PanelContent>
					<PanelContainer>
						<Outlet />
					</PanelContainer>
				</PanelContent>
				<Footer />
				<Portal>
					<FixedPlugin fixed={fixed} />
				</Portal>
				<Configurator
					secondary={getActiveNavbar(routes)}
					isOpen={isOpen}
					onClose={onClose}
					// isChecked={fixed}
					// onSwitch={(value) => {
					// 	setFixed(value);
					// }}
					// onOpaque={() => setSidebarVariant('opaque')}
					// onTransparent={() => setSidebarVariant('transparent')}
				/>
			</MainPanel>
		</ChakraProvider>
	);
}
