import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Item(props) {
    let noColor = { filter: "saturate(0) brightness(1.6)"}
    let walStyle = String(props.item.original)==""?noColor:{}
    let amzStyle = String(props.item.amazon)==""?noColor:{}
    return <div className="item-to-show" id={props.item.sku}>
        <p className="font-semibold">{props.item.name}</p>
        <p><span className="font-semibold">Model/SKU:</span> {props.item.sku}</p>
        <div className="flex mt-3 mb-4">
            <CopyToClipboard text={props.item.original} onCopy={props.doCopied}>
                <div style={walStyle}
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 mr-3">
                    Link {String(props.item.original).includes("walmart") ? "Walmart" : (String(props.item.original) == "" ? "Walmart" : String(props.item.original).slice(String(props.item.original).indexOf("//"), String(props.item.original).indexOf(".com")))}</div></CopyToClipboard>
            <CopyToClipboard text={props.item.amazon} onCopy={props.doCopied}>
                <div style={amzStyle}
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-yellow-600 rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-200">
                    Link Amazon</div></CopyToClipboard>
        </div>
    </div>
}