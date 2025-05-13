export default function Loading({message}: {message : String}) {
    if(message == undefined) message = ""
    return <div className="container">
        <div className="cargando bg-greenpitch.">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">{message}</span>
        </div>
    </div>
}