import {
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import avatar1 from "assets/img/avatars/avatar1.png";
// import avatar2 from "assets/img/avatars/avatar2.png";
// import avatar3 from "assets/img/avatars/avatar3.png";
import { SettingsIcon } from "../Icons/Icons";
import SidebarResponsive from "../Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import { useRef } from "react";
import routes from "../../../routes";
import useAuth from "../../../utils/hooks/useAuth";

export default function HeaderLinks(props: any) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  // Chakra Color Mode
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
	const { signOut } = useAuth()

  if (secondary) {
    navbarIcon = "white";
  }
  const settingsRef = useRef<any>();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Button
        ms="0px"
        px="0px"
        me={{ sm: "2px", md: "16px" }}
        color={navbarIcon}
        variant="transparent-with-icon"
        onClick={signOut}
      >
        <Text display={{ sm: "none", md: "flex" }}>Cerrar sesión</Text>
      </Button>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  logoText: PropTypes.string,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
