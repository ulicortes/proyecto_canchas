export default function Loading({message}: {message : String}) {
    if(message == undefined) message = "Cargando..."
    return <div className="container">
        <div className="cargando w-2/3 justify-center text-center">
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <div className="pelotas"></div>
            <span className="texto-cargando">{message}</span>
        </div>
    </div>
}