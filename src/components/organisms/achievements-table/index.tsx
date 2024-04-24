import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import { Achievements } from '@prisma/client';
import NextImage from 'next/image';

type AchievementsTableProps = {
  data: Achievements[];
}

export function AchievementsTable({ data }: AchievementsTableProps) {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Como conquistar</Th>
            <Th isNumeric>Valor em gemas</Th>
            <Th isNumeric>Logo do Badge</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(ac => (
            <Tr key={ac.id}>
              <Td whiteSpace="pre-wrap" maxW="25%">{ac.name}</Td>
              <Td whiteSpace="pre-wrap" maxW="25%">{ac.description}</Td>
              <Td whiteSpace="pre-wrap" maxW="25%">{ac.value}</Td>
              <Td whiteSpace="pre-wrap" maxW="25%">
                 <Box w="100px" h="100px">
                    <NextImage
                      src={ac.image}
                      alt={ac.name}
                      width="100px"
                      height="100px"
                      style={{ borderRadius: '50%' }}
                    />
                  </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Título</Th>
            <Th>Como conquistar</Th>
            <Th isNumeric>Valor em gemas</Th>
            <Th isNumeric>Logo do Badge</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
