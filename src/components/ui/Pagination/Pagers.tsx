import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  HiOutlineChevronDoubleLeft,
  HiOutlineDotsHorizontal, 
  HiChevronDoubleRight 
} from 'react-icons/hi';
import { List, ListItem, useStyleConfig, IconButton, Button } from '@chakra-ui/react';

const PAGER_COUNT = 7;

const NextMore = ({ onArrow }: any) => {
  const [quickNextArrowIcon, setQuickNextArrowIcon] = useState(false);

  return (
    <ListItem>
      <IconButton
        icon={quickNextArrowIcon ? <HiChevronDoubleRight /> : <HiOutlineDotsHorizontal />}
        aria-label="Next More"
        onMouseEnter={() => setQuickNextArrowIcon(true)}
        onMouseLeave={() => setQuickNextArrowIcon(false)}
        onClick={() => onArrow('nextMore')}
      />
    </ListItem>
  );
}

const PrevMore = ({ onArrow }: any) => {
  const [quickPrevArrowIcon, setQuickPrevArrowIcon] = useState(false);

  return (
    <ListItem>
      <IconButton
        icon={quickPrevArrowIcon ? <HiOutlineChevronDoubleLeft /> : <HiOutlineDotsHorizontal />}
        aria-label="Previous More"
        onMouseEnter={() => setQuickPrevArrowIcon(true)}
        onMouseLeave={() => setQuickPrevArrowIcon(false)}
        onClick={() => onArrow('prevMore')}
      />
    </ListItem>
  );
}

const Pagers = (props: any) => {
  const { 
    pageCount, 
    currentPage, 
    onChange
  } = props;

  const [showPrevMore, setShowPrevMore] = useState(false);
  const [showNextMore, setShowNextMore] = useState(false);

  useEffect(() => {
    if (pageCount > PAGER_COUNT) {
      setShowPrevMore(currentPage > PAGER_COUNT - 2);
      setShowNextMore(currentPage < pageCount - 2);
      if (currentPage >= pageCount - 3 && currentPage <= pageCount) {
        setShowNextMore(false);
      }
      if (currentPage >= 1 && currentPage <= 4) {
        setShowPrevMore(false);
      }
    } else {
      setShowPrevMore(false);
      setShowNextMore(false);
    }
  }, [currentPage, pageCount]);

  const onPagerClick = (value: any) => {
    let newPage = Math.max(1, Math.min(value, pageCount));
    if (newPage !== currentPage) {
      onChange(newPage);
    }
  }

  const onArrowClick = useCallback((e: any) => {
    let newPage = currentPage;
    if (e === 'nextMore') {
      newPage = currentPage + 5;
    }
    if (e === 'prevMore') {
      newPage = currentPage - 5;
    }
    onChange(newPage);
  }, [currentPage, onChange]);

  const getPages = useMemo(() => {
    const pagerArray = [];
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (PAGER_COUNT - 2);
      for (let i = startPage; i < pageCount; i++) {
        pagerArray.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < PAGER_COUNT; i++) {
        pagerArray.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(PAGER_COUNT / 2) - 1;
      const maxRange = currentPage >= pageCount - 2 && currentPage <= pageCount;
      for (let i = currentPage - offset; i <= currentPage + (maxRange ? 0 : offset); i++) {
        pagerArray.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        pagerArray.push(i);
      }
    }
    return pagerArray?.length > (PAGER_COUNT - 2) ? [] : pagerArray;
  }, [showPrevMore, showNextMore, currentPage, pageCount]);

  const styles = useStyleConfig("Pagination");

  return (
    <List display="flex" spacing={2}>
      {pageCount > 0 && (
        <ListItem
          sx={styles}
          mt={2}
          onClick={() => onPagerClick(1)}
        >
          {
            currentPage == 1 ? (
              <Button color='gray.500' aria-label="1">1</Button>
            ) : 1
          }
        </ListItem>
      )}
      {showPrevMore && <PrevMore onArrow={onArrowClick} />}
      {getPages.map((pager) => (
        <ListItem
          key={pager}
          sx={styles}
          onClick={() => onPagerClick(pager)}
        >
          {
            currentPage == pager ? (
              <Button color='gray.500' aria-label="1">{ pager }</Button>
            ) : pager
          }
        </ListItem>
      ))}
      {showNextMore && <NextMore onArrow={onArrowClick} />}
      {pageCount > 1 && (
        <ListItem
          sx={styles}
          onClick={() => onPagerClick(pageCount)}
        >
          {
            currentPage == pageCount ? (
              <Button color='gray.500' aria-label="1">{ pageCount }</Button>
            ) : pageCount
          }
        </ListItem>
      )}
    </List>
  );
}

export default Pagers;
