import React from 'react';
import { IconButton, useStyleConfig } from '@chakra-ui/react';
import { HiChevronRight } from 'react-icons/hi';

const Next = (props: any) => {
  const { currentPage, pageCount, onNext } = props;

  const disabled = currentPage === pageCount || pageCount === 0;

  const onNextClick = (e: any) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    onNext(e);
  };

  const styles = useStyleConfig("Pagination");

  return (
    <IconButton
      icon={<HiChevronRight />}
      aria-label="Next"
      onClick={onNextClick}
      isDisabled={disabled}
      sx={styles}
    />
  );
};

export default Next;
