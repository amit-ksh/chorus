import { Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { InstantSearch } from 'react-instantsearch-dom';

import {
  CustomSearchBox,
  CustomHits,
} from '../components/meilisearchStyledComponent';
import { searchClient } from '../lib/meilisearch';

const Search = () => {
  return (
    <Box mx={4} my={8}>
      <InstantSearch indexName="steam-video-games" searchClient={searchClient}>
        <InputGroup>
          <CustomSearchBox />
          <InputRightElement
            color="purple.400"
            fontSize="xl"
            mr={2}
            children={<MdSearch />}
          />
        </InputGroup>
        <Box mt={6} mx={12}>
          <CustomHits />
        </Box>
      </InstantSearch>
    </Box>
  );
};

export default Search;
