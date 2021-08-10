import styled from 'styled-components';
import Slider from "react-slick";

import { ChevronBackOutline } from 'react-ionicons'
import { ChevronForwardOutline } from 'react-ionicons'

const Slick = styled.div`
    margin:0 auto;
    width: 400px;
    background-color:blue;   
`;
const Content = styled.div`
    background-color:green;   
`;
const El = styled.div`
    margin:0 auto;
    background-color:red;   
    width:300px;
    height: 300px;
    text-align:center;
    color:white;
    font-size:30px;
`;

function SamplePrevArrow (props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: 'yellow', float: 'left', marginTop: '150px', marginLeft: '-100px' }}
    ><ChevronBackOutline
        color={'black'}
        height="50px"
        width="50px"
      /></div>

  );
}
function SampleNextArrow (props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: 'yellow', float: 'right', marginTop: '-150px', marginRight: '-100px' }}
    ><ChevronForwardOutline
        color={'#00000'}
        height="50px"
        width="50px"
      /></div>
  );
}
function App () {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const contents = [1, 2, 3, 4, 5];
  return (
    <div className="App">
      <Slick>
        <h2> Single Item</h2>
        <Slider {...settings}>
          {contents.map((el, idx) => {
            return (
              <Content key={idx}>
                <El>{el}</El>
              </Content>
            );
          })}
        </Slider>
      </Slick>
    </div>
  );
}

export default App;
