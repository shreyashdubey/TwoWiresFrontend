import React, { useMemo } from "react";
import {
  Container,
  Heading,
  SimpleGrid,
  Card,
  Box,
  Badge,
  Text,
  Image,
  VStack,
  HStack,
  Spacer,
  useColorModeValue,
  useBreakpointValue,
  Center,
  Flex,
  Link,
} from "@chakra-ui/react";

import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ContestSkeletion = ({ noOfCards }) => {
  const chakraUIColor = useColorModeValue(
    "rgba(0, 87, 255, 1)",
    "rgba(0, 87, 255, 1)"
  );
  const skeletionCard = useMemo(() => {
    const skeletionArr = [];
    for (let i = 0; i < noOfCards; i++) {
      skeletionArr.push(
        <Box
          as={Card}
          boxShadow="lg"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
          w={["250px", "300px", "320px", "300px", "200px", "300px"]}
          h="250px"
          borderRadius="15px"
          overflow="hidden"
          textDecoration="none"
        >
          <Box borderRadius="50px 50px 0 0" h="25%">
            <Skeleton>
              <SkeletonText noOfLines={4} />
            </Skeleton>
          </Box>

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <SkeletonText noOfLines={1} width={10}>
                <Text color="custom.white">Active</Text>
              </SkeletonText>
            </Box>

            <Box
              mt="3"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              <SkeletonText noOfLines={1}></SkeletonText>
            </Box>
            <Text mt={5} color="custom.white">
              <SkeletonText noOfLines={1}></SkeletonText>
            </Text>

            <Box mt="30px" borderTop="1px solid #e1e1e1" pt={2}>
              <Link color={chakraUIColor}>
                <Skeleton height={5}></Skeleton>
              </Link>
            </Box>
          </Box>
        </Box>
      );
    }
    return skeletionArr;
  }, [noOfCards]);

  return skeletionCard;
};

export default ContestSkeletion;
