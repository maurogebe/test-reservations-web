import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import Badge from "../../shared/Badge/Badge";
import {
  setThemeColor,
  setThemeColorLevel,
} from "../../../store/theme/themeSlice";
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const colorList = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "pink",
];

const colorLevelList = [
  { label: "300", value: 300 },
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "600", value: 600 },
  { label: "700", value: 700 },
  { label: "800", value: 800 },
  { label: "900", value: 900 },
];

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  
  const { themeColor, primaryColorLevel } = useSelector((state: RootState) => state.theme.state);
  
  const { colorMode } = useColorMode();

  const onThemeColorChange = (value: string) => {
    dispatch(setThemeColor(value));
  };

  const onThemeColorLevelChange = (value: number) => {
    dispatch(setThemeColorLevel(value));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Flex justifyContent='space-between' width='100%'>
        <Menu>
          <MenuButton as='button' style={{ width: '48%' }}>
            <Flex
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              px={4}
              py={2}
              textAlign="left"
              backgroundColor={colorMode === "light" ? "Dark" : "Light"}
              fontSize="md"
              justifyContent='space-between'
              alignItems='center'
              gap={4}
            >
              <Flex
                alignItems="center"
                gap={2}
                textTransform='capitalize'
              >
                <Badge color={`${themeColor}.${primaryColorLevel}`} />
                { themeColor }
              </Flex>
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            {
              colorList.map((color, index) => (
                <MenuItem
                  key={`color-${index}`}
                  onClick={() => onThemeColorChange(color)}
                >
                  <Flex alignItems="center" gap={2}>
                    <Badge color={`${color}.${primaryColorLevel}`} />
                    <Text textTransform='capitalize'>{color}</Text>
                  </Flex>
                </MenuItem>
              ))
            }
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as='button' style={{ width: '48%' }}>
          <Flex
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              px={4}
              py={2}
              textAlign="left"
              backgroundColor={colorMode === "light" ? "Dark" : "Light"}
              fontSize="md"
              justifyContent='space-between'
              alignItems='center'
              gap={4}
            >
              { primaryColorLevel }
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList style={{ width: '48%' }}>
            {
              colorLevelList.map((color, index) => (
                <MenuItem
                  key={`color-level-${index}`}
                  onClick={() => onThemeColorLevelChange(color.value)}
                >
                  <span>{color.label}</span>
                </MenuItem>
              ))
            }
          </MenuList>
        </Menu>
      </Flex>
    </div>
  );
};
