import React, {useState, useEffect} from 'react'
import SelectBox from './SelectBox'
import {FakeDataArr} from '../store/FakeDataArr'
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 5px; 
  padding: 5px; 
`;

const GridItem = styled.div`
  background-color: black; 
  color: white;
  padding: 50px;
  text-align: center;
  border: 6px solid red;
  aspect-ratio: 1 / 1;
`;

const Button = styled.button`
  padding-top : 7px;
  width: 60px;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const PageButton = styled(Button)``;

const Section = () => {
  const [sectionValue, setSectionValue] = useState('종합');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gridColumns, setGridColumns] = useState(3)
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const matchedData = FakeDataArr.filter(data => data["장르"] === sectionValue);
  const totalPage = Math.ceil(matchedData.length / itemsPerPage); 
  const displayedData = matchedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 800) {
      setGridColumns(5);
      setItemsPerPage(10);
    } else {
      setGridColumns(3);
      setItemsPerPage(3*3);
    }
  }, [windowWidth]);

  const handleUpPage = () => {
    setCurrentPage(currentPage + 1);
  }
  const handleDownPage = () => {
    setCurrentPage(currentPage - 1);
  }
  const handleChangePage = (page) => {
    setCurrentPage(page);
  }

  const handleGridChange = (cols, itemsPerPage) => {
    if (gridColumns !== cols) {
      setGridColumns(cols);
      setItemsPerPage(itemsPerPage);
    }
  }

  const getPageNumbers = () => {
    let pages = [];
    let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    let endPage = Math.min(startPage + 4, totalPage);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  const isWindowWidthGreaterThan =() => {
    let width = 800;
    return windowWidth >= width;
  }

  return (
    <div>
      <SelectBoxContainer>
        <SelectBox onChange = {(value) => {
          setSectionValue(value);
          setCurrentPage(1);
        }} />
      </SelectBoxContainer>
      <Button onClick = {() => handleGridChange(3, 3 * 3)} style = {{display : isWindowWidthGreaterThan() ? 'none' : 'block'}} disabled={gridColumns===3}>3X3</Button>
      <Button onClick = {() => handleGridChange(4, 4 * 4)} style = {{display : isWindowWidthGreaterThan() ? 'none' : 'block'}} disabled={gridColumns===4}>4X4</Button>
      <Button onClick = {() => handleGridChange(5, 5 * 2)} style = {{display : !isWindowWidthGreaterThan() ? 'none' : 'block'}} disabled={gridColumns===5}>5X2</Button>
      <Button onClick = {() => handleGridChange(7, 7 * 3)} style = {{display : !isWindowWidthGreaterThan() ? 'none' : 'block'}} disabled={gridColumns===7}>7X3</Button>
      <GridContainer style = {{gridTemplateColumns : `repeat(${gridColumns}, 1fr)` }}>
        {displayedData.map((data, index) => (
          <GridItem key={index}>{data["내용"]}</GridItem>
        ))}
      </GridContainer>
      <div>
        <Button onClick={handleDownPage} disabled={currentPage === 1}>&lt;</Button>
        {getPageNumbers().map(number => (
          <PageButton
            key={number}
            onClick={() => handleChangePage(number)}
            disabled={currentPage === number}
          >
          {number}
          </PageButton>
        ))}
        <Button onClick={handleUpPage} disabled={currentPage === totalPage}>&gt;</Button>
      </div>
    </div>
  )
}

export default Section;

const SelectBoxContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin-bottom: 10px;    
`;