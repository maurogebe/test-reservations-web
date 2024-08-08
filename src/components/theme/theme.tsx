import { extendTheme } from '@chakra-ui/react';
// import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { PanelContainerComponent } from './additions/layout/PanelContainer';
import { mode } from '@chakra-ui/theme-tools';
import { PaginationStyles } from './additions/table/Pagination';
import { TableStyles } from './additions/table/Table';

export default extendTheme({
  breakpoints,
  styles: {
		global: (props: any) => ({
			body: {
				bg: mode('gray.50', 'gray.800')(props),
				fontFamily: "'Roboto', sans-serif"
			},
			html: {
				fontFamily: "'Roboto', sans-serif"
			}
		})
	},
	colors: {
		gray: {
			700: '#1f2733'
		}
	},
  components: {
    Table: TableStyles,
    Pagination: PaginationStyles,
    Button: buttonStyles,
    Badge: badgeStyles,
    Link: linkStyles,
    Drawer: drawerStyles,
    Card: CardComponent,
    CardBody: CardBodyComponent,
    CardHeader: CardHeaderComponent,
    MainPanel: MainPanelComponent,
    PanelContent: PanelContentComponent,
    PanelContainer: PanelContainerComponent,
  },
});
