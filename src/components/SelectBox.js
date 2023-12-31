import React from 'react'
import Select from 'react-select';
import styled from 'styled-components';
import { selectBoxValueState } from '../utils/DataRecoilState';
import {useRecoilState} from 'recoil';

const options = [
    {value : 'k-pop', label : 'k-pop'},
    {value : 'k-rap', label : 'k-rap'},
    {value : 'k-pop ballad', label : 'k-pop ballad'},
    {value : 'rock', label : 'rock'},
    {value : 'pop', label : 'pop'},
    {value : 'easy listening', label : 'easy listening'},
  ]

const SelectBox = ({onChange, className}) => {
  const [selectedOption, setSelectedOption] = useRecoilState(selectBoxValueState);
  const handleChange = (option) => {
    setSelectedOption(option);
    if (typeof onChange === 'function') {
      onChange(option.value);
    }
  }
  const customStyles = {
    control: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      boxShadow: 'none',
      outline: 'none',
      border: 0,
      
    }),
    menu: (styles) => ({
      ...styles,
      background: 'transparent', 
    }),
    option: (provided, state) => ({
      ...provided,
      opacity: 0.9,
      textAlign: 'center',
      fontWeight: 700,
      background: 'var(--Primary, linear-gradient(271deg, #888BF4 0%, #5151C6 100%))',
      padding: '16px',
      marginBottom: '5px',
      borderRadius: '10px',
      zIndex: 1000,
      position: 'relative',
      lineHeight:'10px',
      border: 'none',
      color:'white',
      ':hover': {
        opacity: 1,
      },
    }),
  };
  
  return (
    <StyledSelectBox className = {className}>
      <div>
        <Select 
          value={selectedOption}
          onChange={handleChange}
          options={options}
          styles={customStyles}
        />
      </div>

    </StyledSelectBox>
  )
}

export default SelectBox;

const StyledSelectBox = styled.div`
  padding-top : 7px;
  width: 100%;
  padding: 8px;
  border-radius: 15px;
  background: var(--Primary, linear-gradient(271deg, #888BF4 0%, #5151C6 100%));
  align-self: center;
  cursor: pointer;
  opacity: 0.9;
`;