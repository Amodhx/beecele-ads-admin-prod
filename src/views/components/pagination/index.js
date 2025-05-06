import React from "react"
import {
  Pagination as ReactPagination,
  PaginationItem,
  PaginationLink
} from "reactstrap"

const Pagination = ({
  handleNext,
  handlePrev,
  currentPage,
  totalPages,
  handlePageChange
}) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxPageButtons = 3
    const halfMaxPageButtons = Math.floor(maxPageButtons / 2)

    let startPage = Math.max(1, currentPage - halfMaxPageButtons)
    let endPage = Math.min(totalPages, currentPage + halfMaxPageButtons)

    if (currentPage <= halfMaxPageButtons) {
      endPage = Math.min(totalPages, maxPageButtons)
    } else if (currentPage + halfMaxPageButtons >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1)
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis" disabled>
            <PaginationLink href="#">...</PaginationLink>
          </PaginationItem>
        )
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink href="#" onClick={() => handlePageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="end-ellipsis" disabled>
            <PaginationLink href="#">...</PaginationLink>
          </PaginationItem>
        )
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <ReactPagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first href="#" onClick={() => handlePageChange(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink href="#" previous onClick={handlePrev} />
      </PaginationItem>
      {renderPageNumbers()}
      {/* {[...Array(totalPages)].map((_, index) => (
        <PaginationItem active={index + 1 === currentPage} key={index + 1}>
          <PaginationLink href="#" onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))} */}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink href="#" next onClick={handleNext} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          last
          href="#"
          onClick={() => handlePageChange(totalPages)}
        />
      </PaginationItem>
    </ReactPagination>
  )
}

export default Pagination
