import React from 'react'
import PropTypes from 'prop-types'
import ClockLoader from '../icons/loaders/clock.svg'
import CircleLoader from '../icons/loaders/circle.svg'
import DotsLoader from '../icons/loaders/dots.svg'

const loaders =[ClockLoader,DotsLoader,CircleLoader]
const type=['clock','dots','circle']
function Loader(props){
  if (!props.loading) { return null;}
  let style ={};
  if (props.size){
    style = {width: props.size,height:props.size};
  }
  let loaderType;
  if (!props.type) {
    loaderType= type[0];
  }
  else {
    loaderType=props.type;
  }

  return(
    <div className="loader-box">
      <div>
        <img src={loaders[type.indexOf(loaderType)]} className="loader-box-svg" style={style} alt="Loader"/>
      </div>
      {props.message &&
        <div>
          {props.message}
        </div>
      }
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.number,
  type:PropTypes.oneOf(type),
  message:PropTypes.string
}

export default Loader
