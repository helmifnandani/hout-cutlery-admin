import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

const FileInput = ({ onChange, valueUrl }) => {
    return (
        <>
            <div className="flex w-full items-center justify-center">
                <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-primary-100 hover:bg-primary-200"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <CloudArrowUpIcon className="mb-2 size-10" />
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">
                                Click to upload
                            </span>
                        </p>
                        <p className="text-xs">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={onChange}
                    />
                    <input
                        id="image"
                        name="image"
                        type="file"
                        className="hidden"
                        defaultValue={valueUrl}
                    />
                </label>
            </div>
        </>
    )
}

export default FileInput
