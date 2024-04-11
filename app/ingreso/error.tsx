'use client'

export default function Error(
    {
        error,
        reset,
    }: {
        error: Error & { digest?: string };
        reset: () => void;
    }
) {
    return <>
        {/* <div>

    </div> */}
        <div className="h-screen flex flex-col justify-center items-center">
            <label className="block text-sm font-medium leading-6 text-black">
                {error.message}
            </label>
                <button
                    className="bg-black text-white hover:bg-yellow hover:text-black py-2 px-2 rounded-md mt-4"
                    onClick={
                        () => reset()
                    }>
                    Intentar otra vez
                </button>
        </div>

    </>
}