import { useEffect, useState } from 'react'
import Item from './Item'

let searchImg = "https://www.seekpng.com/png/full/788-7884538_google-cloud-search-illustration.png"

function SearchPage(props) {
    const [products, setProducts] = useState([]);
    let onClickSearch = () => {
        let name = document.getElementById("productName").value
        let sku = document.getElementById("productSKU").value
        fetch(`/api/getproducts?name=${name}&sku=${sku}`).then(res => res.json()).then(res => {
            setProducts(res.products)
        })
    }
    let productsToDiv = products.length==0?<div className='no-result'>No results match</div>:<div className='items-container'>{products.map((item) => <Item doCopied={props.doCopied} item={item} />)}</div>
    return <div className="container mx-auto">
        <div className="flex justify-center m-7">
            <img className="searchIcon" src={searchImg}></img>
            <div className='searchPageText'><span id="search-text">Search</span> Your<br />Product <span id="search-here">Here</span></div>
        </div>
        <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
            <div className="flex flex-col md:flex-row w-3/4 md:w-full md:max-w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                    <input type="text" id="productName" 
                    onKeyPress={(e) => e.key === 'Enter' && onClickSearch()}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                    placeholder="Product Name" />
                    <input type="text" id="productSKU" 
                    onKeyPress={(e) => e.key === 'Enter' && onClickSearch()}
                    className=" rounded-lg border-transparent max-w-300 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                    placeholder="Model / SKU" />
                <button onClick={onClickSearch}
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">
                    <i class="fas fa-search"></i>
                    Search
                </button>
            </div>
        </div>
        <div className='result-pool'>
            {productsToDiv}
        </div>
    </div>
}

export default SearchPage