import React, { useMemo } from "react";
import {
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  HStack,
  Card,
  Link,
  SimpleGrid,
  Tag,
  TagLabel,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const CreateCompetitionSkeleton = ({ cardNo }) => {
  const contestCard = useMemo(() => {
    const arr = [];
    for (let i = 0; i < cardNo; i++) {
      arr.push(
        <Link>
          <Card
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            w={["250px", "300px", "320px", "300px", "200px", "300px"]}
            h="200px"
          >
            <Skeleton height={6}>
              <Heading mb={4} fontSize="medium"></Heading>
            </Skeleton>
            <SkeletonText mt={3}>
              <Text fontSize="medium">Organizer:</Text>
            </SkeletonText>
            <Skeleton mt={8}>
              <Tag bgColor="green">
                <TagLabel color="black">Published</TagLabel>
              </Tag>
            </Skeleton>
          </Card>
        </Link>,
      );
    }
    return arr;
  }, [cardNo]);

  return contestCard;
};

export default CreateCompetitionSkeleton;
