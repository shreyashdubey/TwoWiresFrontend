import React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag, TagLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import theme from "../utils/color";
import Search from "./Search";

const FilterBar = () => {
  return (
    <Box
      style={{ position: "sticky", top: "55px", zIndex: 1000 }}
      bgColor="custom.charcoal"
      borderTop={`0.5px solid ${theme.colors.custom.alphaBlack}`}
      boxShadow={`2px 2px 10px ${theme.colors.custom.alphaBlack}`}
    >
      <Wrap padding="8px" margin="0 15px">
        <WrapItem>
          <Search />
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default FilterBar;
