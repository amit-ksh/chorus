import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { InstantSearch } from 'react-instantsearch-dom';

import {
  CustomSearchBox,
  CustomHits,
} from '../components/meilisearchStyledComponent';
import { searchClient } from '../lib/meilisearch';

const SelectIndex = (props: SelectProps) => (
  <Select
    _focusVisible={{
      borderColor: 'purple.400',
      boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
    }}
    {...props}
  >
    <option value="artists">Artists</option>
    <option value="playlists">Playlists</option>
    <option value="songs">Songs</option>
  </Select>
);

const Search = () => {
  const [indexName, setIndexName] = useState('songs');

  return (
    <Box mx={4} my={8}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={4}>
          <InputGroup>
            <CustomSearchBox />
            <InputRightElement
              color="purple.400"
              fontSize="xl"
              mr={2}
              children={<MdSearch />}
            />
          </InputGroup>
          <SelectIndex
            w={{ base: 'full', md: '20%' }}
            defaultValue={indexName}
            isRequired
            onChange={(e) => setIndexName(e.target.value)}
          />
        </Flex>
        <Box mt={6} mx={12}>
          <CustomHits />
        </Box>
      </InstantSearch>
    </Box>
  );
};

export default Search;
