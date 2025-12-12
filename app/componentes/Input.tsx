'use client'
export default function Input() {
    return <div className="sm:col-span-3">
        <div className="mt-2">
            <input
                type="text"
                maxLength={20}
                name="tel"
                id="tel"
                placeholder="Contacto"
                onChange={e=>consolelog(e.target.value)}
                className="text-center block w-full rounded-md border-0 py-1.5 bg-transparent text-black placeholder:text-grey focus:ring-2. focus:ring-offset focus:ring-black sm:text2xl. xl:text-[1.5rem] sm:leading-6"
            />
        </div>
    </div>
}

function consolelog(valor: string) {
    if(valor.length == 1) {
        console.log(valor == '@');
    }
}