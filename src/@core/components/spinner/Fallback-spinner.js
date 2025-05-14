// ** Logo
import logo from '../../../assets/images/logo/Logo.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={logo} width={'45px'} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
