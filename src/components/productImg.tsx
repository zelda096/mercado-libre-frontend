import React, { useState, useEffect } from "react"
import '../styles/img.scss'

interface ImageProps {
    url: string
}

const ImageComponent: React.FC<ImageProps> = ({ url }) => {
    const [format, setFormat] = useState<string>("")

    useEffect(() => {
        const image = new Image()
        image.onload = () => {
            const isVertical = image.height > image.width
            setFormat(isVertical ? "vertical" : "horizontal")
        }
        image.src = url
    }, [url])

    return (
        <div className="img-container">
            <img className={format === "vertical" ? "imgVertical" : "imgHorizontal"} src={url} alt={url} />
        </div>
    )
}

export default ImageComponent
