import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Text,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  Button,
  Box,
  IconButton,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";



function AppLayout({ children, selectedPage, setSelectedPage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("right");

  return (
    <>
      <Box>
        <Grid
          templateAreas={`"header header"
           "main main"
           `}
          gridTemplateRows={"50px 1fr 30px"}
          gridTemplateColumns={"200px 1fr"}
          h="100vh"
          gap="1"
          fontWeight="bold"
        >
          <GridItem pl="2" color="gray" area={"header"} mt={1} borderRadius={15}  alignSelf="center" justifySelf="center" alignItems="center" justifyItems={"center"} minW="160px" minH="50px">
            <Stack direction="row">
            <Button
            
            
                  onClick={(e) => {
                    setSelectedPage("Peliculas");
                  }}
                  variant="link"
                  w="100%"
                >
                  Peliculas
                </Button>
                <p>{`\u2022`}</p>
                <Button
                
                  onClick={(e) => {
                    setSelectedPage("Generos");
                  }}
                  variant="link"
                  w="100%"
                >
                  {`Generos`}
                  
                </Button>
                <p>{`\u2022`}</p>
                
                <Button
                
                  onClick={(e) => {
                    setSelectedPage("Usuarios");
                  }}
                  variant="link"
                  w="100%"
                >
                  Usuarios
                </Button>
            </Stack>
          </GridItem>
         

          <GridItem pl="2" area={"main"}>
            {children}
          </GridItem>
         
        </Grid>
      </Box>
    </>
  );
}

export default AppLayout;
