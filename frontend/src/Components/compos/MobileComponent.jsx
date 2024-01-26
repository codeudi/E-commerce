import "./MobileComponent.css"
import {Link} from "react-router-dom"
function Mobile({url,name,description,number,price,delivery,id}) {

  return (
    <>
      <Link to={`/productCheckout/${id}`} className="outerbox">
        <div className='image'>
              <img src={url}></img>
            </div>
            <div className='info'>
            <p className='sponsor'>Sponsored </p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt17DiXCmwmguPz3FYEtwhB0171zPBC8gHztL1DuHHQJ1IYrJsqJYGi8EaLlAht56UN-8&usqp=CAU" height="12px" width="12px" className='image4'></img>
            </div>
            <div className="lower">
                <h1 className="heading">{name}</h1>
                <p className="desc">{description}</p>
                <div className='cols'>
                <div className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 576 512"><path fill="#ffae00" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 576 512"><path fill="#ffae00" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 576 512"><path fill="#ffae00" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 576 512"><path fill="#ffae00" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 576 512"><path fill="#ffae00" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                </div>
                <svg className="pop" xmlns="http://www.w3.org/2000/svg" height="8" width="8" viewBox="0 0 384 512"><path fill="#07768e" d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z"/></svg>
                <p className='num'>{number}</p>
                </div>
                <div className='col2'>
                  <p className='rupees'>₹</p>
                  <p className='pricep'>{price.cost}</p>
                  <p className='mrp'>M.R.P: {price.mrp} <span className="off">{price.discount}</span></p>
                </div>
                <div className='col3'>
                  <div className='row1'>
                  <img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" height="50x" width="50px" className='image2'></img>
                  <p className='delivery'>Get is by <span className='date'>{delivery}</span></p>
                  </div>
                  <p className='free'>FREE Delivery by Amazon</p>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Mobile