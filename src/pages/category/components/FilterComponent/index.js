import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';

import { Radio, RadioGroup } from '@chakra-ui/react';
import StarGroup from '../../../../components/StarGroup';

function FilterComponent(props) {
  const filterConfig = [4.5, 4.0, 3.5, 3.0];
  const [ratings, setRatings] = useState(null);
  const [price, setPrice] = useState('asc');

  useEffect(() => {
    props.onFilter({
      ratings,
      sortByPrice: price,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, ratings]);

  const radioItems = filterConfig.map(q => (
    <Radio value={q} key={q}>
      <HStack>
        <StarGroup point={q} showRating={false} />
        <Text color="gray.400" fontSize="sm">
          {q} & up
        </Text>
      </HStack>
    </Radio>
  ));

  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
            Ratings
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <RadioGroup value={ratings} onChange={v => setRatings(Number(v))}>
            <VStack alignItems="start">{radioItems}</VStack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
            Price
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <RadioGroup value={price} onChange={setPrice}>
            <VStack alignItems="start">
              <Radio value="desc">Descending</Radio>
              <Radio value="asc">Ascending</Radio>
            </VStack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterComponent;
