const DescriptionWrapper = (props) => {
    const { title, details } = props
  
    return <>
      <h4 style={{fontWeight:'bold',fontSize:'15px'}} >{title}</h4>
      <div>{details}</div>
      {props.children}
    </>
  }
export default DescriptionWrapper