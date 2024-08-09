// src/components/Field.tsx
import React from 'react';
import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react';
import { fieldSoccerHorizontalImage, fieldSoccerImage } from '../../../assets/images';
import { BankingSidebar } from './BankingSidebar';
import { StartingPlayers } from './StartingPlayers';

const Field = ({ handleDrop, handleDragOver }: any) => {

  const getImageSrc = () => {
    const res = useBreakpointValue({
      base: 'fff',
      sm: fieldSoccerHorizontalImage,
      lg: fieldSoccerImage,
    });
    console.log(res)
    return res;
  };

  return (
    <Flex direction={{ sm: 'column', lg: 'row' }} alignItems={{ sm: 'center', lg: 'flex-start' }} w='100%' justifyContent='center' gap={4}>
      <Flex justifyContent='center' position='relative'>
        {/* <Image borderRadius={8} w={{ sm: '80%', lg: '60%' }} display={{ sm: 'inline-block', lg: 'none' }} src={fieldSoccerHorizontalImage}/> */}
        <Image borderRadius={8} w={{ sm: '100%', md: '80%', lg: '80%' }} src={fieldSoccerImage}/>
        <StartingPlayers handleDrop={handleDrop} handleDragOver={handleDragOver} />
      </Flex>
      <BankingSidebar />
    </Flex>
  );
};

export default Field;
