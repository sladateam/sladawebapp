/**
 * Mocking client-server processing
 */

    import axios from 'axios';

    // export const _products = (state) => {
    //     return axios.get('https://sheetdb.io/api/v1/imx11o6z64lzo', {})
    // }

//   const _products = [
//     {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
//     {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
//     {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
//   ]

    const _products = axios.get( "https://api.sheetson.com/v1/sheets/Sheet1?spreadsheetId=1N6T2X90zve0_zZ2VXklYuPjbCXgJK8VQk6r4QZ_afFg" )
        .then(response => {
            console.log(response)

            return response.data;

        })
        .catch(error => {
            if (error.response) {
                console.log(error.response)
            }
        });
  
    export default {
        getProducts (cb) {
            setTimeout(() => cb(JSON.parse(_products)), 100)
        },
  
        buyProducts (products, cb, errorCb) {
            setTimeout(() => {
                // simulate random checkout failure.
                (Math.random() > 0.5 || navigator.webdriver)
                ? cb()
                : errorCb()
            }, 100)
        }
    }