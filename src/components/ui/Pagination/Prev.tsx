import React from 'react';
import { IconButton, useStyleConfig } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';

const Prev = (props: any) => {
  const { currentPage, onPrev } = props;

  const disabled = currentPage <= 1;

  const onPrevClick = (e: any) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onPrev(e);
  };

  const styles = useStyleConfig("Pagination");

  return (
    <IconButton
      icon={<HiChevronLeft />}
      aria-label="Previous"
      onClick={onPrevClick}
      isDisabled={disabled}
      sx={styles}
    />
  );
};

export default Prev;
