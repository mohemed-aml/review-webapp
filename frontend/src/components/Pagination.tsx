// frontend/src/components/Pagination.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/bookSlice';
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './ui/pagination';
import { RootState } from '../redux/store';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state: RootState) => state.books);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    const leftSibling = Math.max(currentPage - 4, 1);
    const rightSibling = Math.min(currentPage + 4, totalPages);

    if (leftSibling > 1) {
      pageNumbers.push(1);
      if (leftSibling > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pageNumbers.push(i);
    }

    if (rightSibling < totalPages) {
      if (rightSibling < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <ShadPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>
          {getPageNumbers().map((page, idx) =>
            typeof page === 'number' ? (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={idx} />
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    </div>
  );
};

export default Pagination;